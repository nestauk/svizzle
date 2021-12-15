import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, t as text, f as claim_element, g as children, h as claim_text, b as detach_dev, j as attr_dev, H as toggle_class, l as add_location, m as insert_hydration_dev, n as append_hydration_dev, $ as listen_dev, o as noop, a0 as bubble, Z as set_data_dev, a1 as empty, a2 as getContext, a3 as setContext, C as create_component, D as claim_component, E as mount_component, u as transition_in, w as transition_out, F as destroy_component, a as space, c as claim_space, G as group_outros, x as check_outros, p as validate_each_argument, y as destroy_each, a4 as globals, a5 as null_to_empty, a6 as makeStyleVars, I as svg_element, J as claim_svg_element, a7 as add_render_callback, a8 as add_resize_listener, a9 as createEventDispatcher, aa as validate_store, ab as component_subscribe, ac as writable, ad as concat, ae as mergeObj, af as appendTo, R as getKey$2, ag as has, ah as last, ai as pullFrom, aj as sort, ak as uniques, al as is_function, am as run_all, an as subscribe, K as Icon, r as create_slot, ao as _screen, z as update_slot_base, A as get_all_dirty_from_scope, B as get_slot_changes, ap as Switch, aq as ArrowLeftCircle, P as ArrowRightCircle, ar as ChevronLeft, as as ChevronRight, at as MinusCircle, au as PlusCircle, av as A11yPerson, aw as ScreenSensor, ax as isServerSide, ay as isClientSide, az as makeKeyed, aA as _, aB as pairs, aC as prop_dev, q as query_selector_all, aD as setIn, aE as binding_callbacks, aF as assign, aG as get_spread_update, aH as get_spread_object } from './client.5c29960b.js';
import { A as AlertTriangle, S as Sun, l as lookup } from './_utils.cc44018f.js';
import { B as BarchartVDiv, C as ChoroplethG, p as projections, d as defaultGeometry } from './ChoroplethG.d4591b5d.js';
import { v as vectorLength2D, a as arrayMaxWith, g as getBinsTicks, b as getValuesLength, e as exactAmountBins, c as areValidBins, d as getBinsItems, f as getBinsMax, h as getBinsMin, i as getBinsExtent, j as isNonEmptyBin, k as findFirstNonEmptyBinIndex, l as findLastNonEmptyBinIndex, m as getTrimmedBinsStats, n as getBinsTicksExtent, o as getNonEmptyBinsTicks, C as ColorBinsG, p as ColorBinsDiv, L as LinkButton, M as MessageView, q as CheckSquare, r as ChevronDown, s as ChevronUp, G as Globe, t as MinusSquare, S as Square } from './MessageView.363c2e26.js';
import { t as transformer, c as copy, i as initRange, a as ticks, l as linear, L as Link, E as ExternalLink } from './linear.ec33a939.js';
import { b as format } from './defaultLocale.de695f5f.js';
import { g as getValue$2, i as inclusiveRange } from './yootils.es.6e4269de.js';
import { L as LoadingView, a as Loader } from './LoadingView.e85ac4d0.js';
import { A as Activity, B as BarChart, C as Clock, L as List, M as MapPin } from './MapPin.c6140e3f.js';
import { D as Download } from './Download.aeddc67b.js';
import { I as Info } from './Info.c6802fb5.js';
import { S as Settings } from './Settings.d1e8e800.js';
import './equalEarth.6f28e0cb.js';

function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function loggish(transform) {
  var scale = transform(transformLog, transformExp),
      domain = scale.domain,
      base = 10,
      logs,
      pows;

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i <= j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = ticks(u, v, n);
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  return scale;
}

function log() {
  var scale = loggish(transformer()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, log()).base(scale.base());
  };

  initRange.apply(scale, arguments);

  return scale;
}

var contextKey = {};

/* ../../../node_modules/svelte-json-tree/src/JSONArrow.svelte generated by Svelte v3.44.2 */

const file$4h = "../../../node_modules/svelte-json-tree/src/JSONArrow.svelte";

function create_fragment$4o(ctx) {
	let div1;
	let div0;
	let t_value = '\u25B6' + "";
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			t = claim_text(div0_nodes, t_value);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "arrow svelte-1vyml86");
			toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
			add_location(div0, file$4h, 29, 2, 622);
			attr_dev(div1, "class", "container svelte-1vyml86");
			add_location(div1, file$4h, 28, 0, 587);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			append_hydration_dev(div1, div0);
			append_hydration_dev(div0, t);

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[1], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*expanded*/ 1) {
				toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4o.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4n($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONArrow', slots, []);
	let { expanded } = $$props;
	const writable_props = ['expanded'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONArrow> was created with unknown prop '${key}'`);
	});

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({ expanded });

	$$self.$inject_state = $$props => {
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [expanded, click_handler];
}

class JSONArrow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4n, create_fragment$4o, safe_not_equal, { expanded: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONArrow",
			options,
			id: create_fragment$4o.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*expanded*/ ctx[0] === undefined && !('expanded' in props)) {
			console.warn("<JSONArrow> was created without expected prop 'expanded'");
		}
	}

	get expanded() {
		throw new Error("<JSONArrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONArrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/JSONKey.svelte generated by Svelte v3.44.2 */

const file$4g = "../../../node_modules/svelte-json-tree/src/JSONKey.svelte";

// (16:0) {#if showKey && key}
function create_if_block$8(ctx) {
	let label;
	let span;
	let t0;
	let t1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = element("label");
			span = element("span");
			t0 = text(/*key*/ ctx[0]);
			t1 = text(/*colon*/ ctx[2]);
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { class: true });
			var label_nodes = children(label);
			span = claim_element(label_nodes, "SPAN", {});
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, /*key*/ ctx[0]);
			t1 = claim_text(span_nodes, /*colon*/ ctx[2]);
			span_nodes.forEach(detach_dev);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4g, 17, 4, 399);
			attr_dev(label, "class", "svelte-1vlbacg");
			toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
			add_location(label, file$4g, 16, 2, 346);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, label, anchor);
			append_hydration_dev(label, span);
			append_hydration_dev(span, t0);
			append_hydration_dev(span, t1);

			if (!mounted) {
				dispose = listen_dev(label, "click", /*click_handler*/ ctx[5], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*key*/ 1) set_data_dev(t0, /*key*/ ctx[0]);
			if (dirty & /*colon*/ 4) set_data_dev(t1, /*colon*/ ctx[2]);

			if (dirty & /*isParentExpanded*/ 2) {
				toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$8.name,
		type: "if",
		source: "(16:0) {#if showKey && key}",
		ctx
	});

	return block;
}

function create_fragment$4n(ctx) {
	let if_block_anchor;
	let if_block = /*showKey*/ ctx[3] && /*key*/ ctx[0] && create_if_block$8(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*showKey*/ ctx[3] && /*key*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$8(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4m($$self, $$props, $$invalidate) {
	let showKey;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONKey', slots, []);
	let { key, isParentExpanded, isParentArray = false, colon = ':' } = $$props;
	const writable_props = ['key', 'isParentExpanded', 'isParentArray', 'colon'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONKey> was created with unknown prop '${key}'`);
	});

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('colon' in $$props) $$invalidate(2, colon = $$props.colon);
	};

	$$self.$capture_state = () => ({
		key,
		isParentExpanded,
		isParentArray,
		colon,
		showKey
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('colon' in $$props) $$invalidate(2, colon = $$props.colon);
		if ('showKey' in $$props) $$invalidate(3, showKey = $$props.showKey);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded, isParentArray, key*/ 19) {
			$$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
		}
	};

	return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

class JSONKey extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4m, create_fragment$4n, safe_not_equal, {
			key: 0,
			isParentExpanded: 1,
			isParentArray: 4,
			colon: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONKey",
			options,
			id: create_fragment$4n.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONKey> was created without expected prop 'key'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONKey> was created without expected prop 'isParentExpanded'");
		}
	}

	get key() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colon() {
		throw new Error("<JSONKey>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colon(value) {
		throw new Error("<JSONKey>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/JSONNested.svelte generated by Svelte v3.44.2 */
const file$4f = "../../../node_modules/svelte-json-tree/src/JSONNested.svelte";

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	child_ctx[20] = i;
	return child_ctx;
}

// (57:4) {#if expandable && isParentExpanded}
function create_if_block_3$1(ctx) {
	let jsonarrow;
	let current;

	jsonarrow = new JSONArrow({
			props: { expanded: /*expanded*/ ctx[0] },
			$$inline: true
		});

	jsonarrow.$on("click", /*toggleExpand*/ ctx[15]);

	const block = {
		c: function create() {
			create_component(jsonarrow.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonarrow.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonarrow, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
			jsonarrow.$set(jsonarrow_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonarrow.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonarrow.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonarrow, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(57:4) {#if expandable && isParentExpanded}",
		ctx
	});

	return block;
}

// (75:4) {:else}
function create_else_block$2(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text("…");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, "…");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4f, 75, 6, 2085);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, span, anchor);
			append_hydration_dev(span, t);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(75:4) {:else}",
		ctx
	});

	return block;
}

// (63:4) {#if isParentExpanded}
function create_if_block$7(ctx) {
	let ul;
	let t;
	let current;
	let mounted;
	let dispose;
	let each_value = /*slicedKeys*/ ctx[13];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = /*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length && create_if_block_1$5(ctx);

	const block = {
		c: function create() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			t = claim_space(ul_nodes);
			if (if_block) if_block.l(ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-rwxv37");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			add_location(ul, file$4f, 63, 6, 1589);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_hydration_dev(ul, t);
			if (if_block) if_block.m(ul, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(ul, "click", /*expand*/ ctx[16], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/ 10129) {
				each_value = /*slicedKeys*/ ctx[13];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length) {
				if (if_block) ; else {
					if_block = create_if_block_1$5(ctx);
					if_block.c();
					if_block.m(ul, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$7.name,
		type: "if",
		source: "(63:4) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (67:10) {#if !expanded && index < previewKeys.length - 1}
function create_if_block_2$3(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(",");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, ",");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "comma svelte-rwxv37");
			add_location(span, file$4f, 67, 12, 1901);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, span, anchor);
			append_hydration_dev(span, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$3.name,
		type: "if",
		source: "(67:10) {#if !expanded && index < previewKeys.length - 1}",
		ctx
	});

	return block;
}

// (65:8) {#each slicedKeys as key, index}
function create_each_block$4(ctx) {
	let jsonnode;
	let t;
	let if_block_anchor;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*getKey*/ ctx[8](/*key*/ ctx[12]),
				isParentExpanded: /*expanded*/ ctx[0],
				isParentArray: /*isArray*/ ctx[4],
				value: /*expanded*/ ctx[0]
				? /*getValue*/ ctx[9](/*key*/ ctx[12])
				: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12])
			},
			$$inline: true
		});

	let if_block = !/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1 && create_if_block_2$3(ctx);

	const block = {
		c: function create() {
			create_component(jsonnode.$$.fragment);
			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			claim_component(jsonnode.$$.fragment, nodes);
			t = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			mount_component(jsonnode, target, anchor);
			insert_hydration_dev(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonnode_changes = {};
			if (dirty & /*getKey, slicedKeys*/ 8448) jsonnode_changes.key = /*getKey*/ ctx[8](/*key*/ ctx[12]);
			if (dirty & /*expanded*/ 1) jsonnode_changes.isParentExpanded = /*expanded*/ ctx[0];
			if (dirty & /*isArray*/ 16) jsonnode_changes.isParentArray = /*isArray*/ ctx[4];

			if (dirty & /*expanded, getValue, slicedKeys, getPreviewValue*/ 9729) jsonnode_changes.value = /*expanded*/ ctx[0]
			? /*getValue*/ ctx[9](/*key*/ ctx[12])
			: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12]);

			jsonnode.$set(jsonnode_changes);

			if (!/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1) {
				if (if_block) ; else {
					if_block = create_if_block_2$3(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnode.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnode, detaching);
			if (detaching) detach_dev(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$4.name,
		type: "each",
		source: "(65:8) {#each slicedKeys as key, index}",
		ctx
	});

	return block;
}

// (71:8) {#if slicedKeys.length < previewKeys.length }
function create_if_block_1$5(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text("…");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, "…");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4f, 71, 10, 2026);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, span, anchor);
			append_hydration_dev(span, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$5.name,
		type: "if",
		source: "(71:8) {#if slicedKeys.length < previewKeys.length }",
		ctx
	});

	return block;
}

function create_fragment$4m(ctx) {
	let li;
	let label_1;
	let t0;
	let jsonkey;
	let t1;
	let span1;
	let span0;
	let t2;
	let t3;
	let t4;
	let current_block_type_index;
	let if_block1;
	let t5;
	let span2;
	let t6;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2] && create_if_block_3$1(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[12],
				colon: /*context*/ ctx[14].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3]
			},
			$$inline: true
		});

	jsonkey.$on("click", /*toggleExpand*/ ctx[15]);
	const if_block_creators = [create_if_block$7, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isParentExpanded*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			li = element("li");
			label_1 = element("label");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span1 = element("span");
			span0 = element("span");
			t2 = text(/*label*/ ctx[1]);
			t3 = text(/*bracketOpen*/ ctx[5]);
			t4 = space();
			if_block1.c();
			t5 = space();
			span2 = element("span");
			t6 = text(/*bracketClose*/ ctx[6]);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			label_1 = claim_element(li_nodes, "LABEL", { class: true });
			var label_1_nodes = children(label_1);
			if (if_block0) if_block0.l(label_1_nodes);
			t0 = claim_space(label_1_nodes);
			claim_component(jsonkey.$$.fragment, label_1_nodes);
			t1 = claim_space(label_1_nodes);
			span1 = claim_element(label_1_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			span0 = claim_element(span1_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t2 = claim_text(span0_nodes, /*label*/ ctx[1]);
			span0_nodes.forEach(detach_dev);
			t3 = claim_text(span1_nodes, /*bracketOpen*/ ctx[5]);
			span1_nodes.forEach(detach_dev);
			label_1_nodes.forEach(detach_dev);
			t4 = claim_space(li_nodes);
			if_block1.l(li_nodes);
			t5 = claim_space(li_nodes);
			span2 = claim_element(li_nodes, "SPAN", {});
			var span2_nodes = children(span2);
			t6 = claim_text(span2_nodes, /*bracketClose*/ ctx[6]);
			span2_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span0, file$4f, 60, 34, 1504);
			add_location(span1, file$4f, 60, 4, 1474);
			attr_dev(label_1, "class", "svelte-rwxv37");
			add_location(label_1, file$4f, 55, 2, 1253);
			add_location(span2, file$4f, 77, 2, 2112);
			attr_dev(li, "class", "svelte-rwxv37");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
			add_location(li, file$4f, 54, 0, 1214);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, li, anchor);
			append_hydration_dev(li, label_1);
			if (if_block0) if_block0.m(label_1, null);
			append_hydration_dev(label_1, t0);
			mount_component(jsonkey, label_1, null);
			append_hydration_dev(label_1, t1);
			append_hydration_dev(label_1, span1);
			append_hydration_dev(span1, span0);
			append_hydration_dev(span0, t2);
			append_hydration_dev(span1, t3);
			append_hydration_dev(li, t4);
			if_blocks[current_block_type_index].m(li, null);
			append_hydration_dev(li, t5);
			append_hydration_dev(li, span2);
			append_hydration_dev(span2, t6);
			current = true;

			if (!mounted) {
				dispose = listen_dev(span1, "click", /*toggleExpand*/ ctx[15], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*expandable, isParentExpanded*/ 2052) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(label_1, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 4096) jsonkey_changes.key = /*key*/ ctx[12];
			if (dirty & /*isParentExpanded*/ 4) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[3];
			jsonkey.$set(jsonkey_changes);
			if (!current || dirty & /*label*/ 2) set_data_dev(t2, /*label*/ ctx[1]);
			if (!current || dirty & /*bracketOpen*/ 32) set_data_dev(t3, /*bracketOpen*/ ctx[5]);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(li, t5);
			}

			if (!current || dirty & /*bracketClose*/ 64) set_data_dev(t6, /*bracketClose*/ ctx[6]);

			if (dirty & /*isParentExpanded*/ 4) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(jsonkey.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(jsonkey.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (if_block0) if_block0.d();
			destroy_component(jsonkey);
			if_blocks[current_block_type_index].d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4l($$self, $$props, $$invalidate) {
	let slicedKeys;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONNested', slots, []);
	let { key, keys, colon = ':', label = '', isParentExpanded, isParentArray, isArray = false, bracketOpen, bracketClose } = $$props;
	let { previewKeys = keys } = $$props;
	let { getKey = key => key } = $$props;
	let { getValue = key => key } = $$props;
	let { getPreviewValue = getValue } = $$props;
	let { expanded = false, expandable = true } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	function expand() {
		$$invalidate(0, expanded = true);
	}

	const writable_props = [
		'key',
		'keys',
		'colon',
		'label',
		'isParentExpanded',
		'isParentArray',
		'isArray',
		'bracketOpen',
		'bracketClose',
		'previewKeys',
		'getKey',
		'getValue',
		'getPreviewValue',
		'expanded',
		'expandable'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONNested> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(12, key = $$props.key);
		if ('keys' in $$props) $$invalidate(17, keys = $$props.keys);
		if ('colon' in $$props) $$invalidate(18, colon = $$props.colon);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('isArray' in $$props) $$invalidate(4, isArray = $$props.isArray);
		if ('bracketOpen' in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
		if ('bracketClose' in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
		if ('previewKeys' in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
		if ('getKey' in $$props) $$invalidate(8, getKey = $$props.getKey);
		if ('getValue' in $$props) $$invalidate(9, getValue = $$props.getValue);
		if ('getPreviewValue' in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ('expandable' in $$props) $$invalidate(11, expandable = $$props.expandable);
	};

	$$self.$capture_state = () => ({
		getContext,
		setContext,
		contextKey,
		JSONArrow,
		JSONNode,
		JSONKey,
		key,
		keys,
		colon,
		label,
		isParentExpanded,
		isParentArray,
		isArray,
		bracketOpen,
		bracketClose,
		previewKeys,
		getKey,
		getValue,
		getPreviewValue,
		expanded,
		expandable,
		context,
		toggleExpand,
		expand,
		slicedKeys
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(12, key = $$props.key);
		if ('keys' in $$props) $$invalidate(17, keys = $$props.keys);
		if ('colon' in $$props) $$invalidate(18, colon = $$props.colon);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('isArray' in $$props) $$invalidate(4, isArray = $$props.isArray);
		if ('bracketOpen' in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
		if ('bracketClose' in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
		if ('previewKeys' in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
		if ('getKey' in $$props) $$invalidate(8, getKey = $$props.getKey);
		if ('getValue' in $$props) $$invalidate(9, getValue = $$props.getValue);
		if ('getPreviewValue' in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ('expandable' in $$props) $$invalidate(11, expandable = $$props.expandable);
		if ('slicedKeys' in $$props) $$invalidate(13, slicedKeys = $$props.slicedKeys);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded*/ 4) {
			if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}

		if ($$self.$$.dirty & /*expanded, keys, previewKeys*/ 131201) {
			$$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
		}
	};

	return [
		expanded,
		label,
		isParentExpanded,
		isParentArray,
		isArray,
		bracketOpen,
		bracketClose,
		previewKeys,
		getKey,
		getValue,
		getPreviewValue,
		expandable,
		key,
		slicedKeys,
		context,
		toggleExpand,
		expand,
		keys,
		colon
	];
}

class JSONNested extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4l, create_fragment$4m, safe_not_equal, {
			key: 12,
			keys: 17,
			colon: 18,
			label: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			isArray: 4,
			bracketOpen: 5,
			bracketClose: 6,
			previewKeys: 7,
			getKey: 8,
			getValue: 9,
			getPreviewValue: 10,
			expanded: 0,
			expandable: 11
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONNested",
			options,
			id: create_fragment$4m.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[12] === undefined && !('key' in props)) {
			console.warn("<JSONNested> was created without expected prop 'key'");
		}

		if (/*keys*/ ctx[17] === undefined && !('keys' in props)) {
			console.warn("<JSONNested> was created without expected prop 'keys'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONNested> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONNested> was created without expected prop 'isParentArray'");
		}

		if (/*bracketOpen*/ ctx[5] === undefined && !('bracketOpen' in props)) {
			console.warn("<JSONNested> was created without expected prop 'bracketOpen'");
		}

		if (/*bracketClose*/ ctx[6] === undefined && !('bracketClose' in props)) {
			console.warn("<JSONNested> was created without expected prop 'bracketClose'");
		}
	}

	get key() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keys() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keys(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get colon() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set colon(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get label() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set label(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isArray() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isArray(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bracketOpen() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bracketOpen(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bracketClose() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bracketClose(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get previewKeys() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set previewKeys(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getKey() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getKey(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getValue() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getValue(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getPreviewValue() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getPreviewValue(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expandable() {
		throw new Error("<JSONNested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expandable(value) {
		throw new Error("<JSONNested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/JSONObjectNode.svelte generated by Svelte v3.44.2 */

const { Object: Object_1$1 } = globals;

function create_fragment$4l(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[5],
				previewKeys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: "" + (/*nodeType*/ ctx[3] + " "),
				bracketOpen: '{',
				bracketClose: '}'
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*keys*/ 32) jsonnested_changes.previewKeys = /*keys*/ ctx[5];
			if (dirty & /*nodeType*/ 8) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + " ");
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4k($$self, $$props, $$invalidate) {
	let keys;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONObjectNode', slots, []);
	let { key, value, isParentExpanded, isParentArray, nodeType } = $$props;
	let { expanded = false } = $$props;

	function getValue(key) {
		return value[key];
	}

	const writable_props = ['key', 'value', 'isParentExpanded', 'isParentArray', 'nodeType', 'expanded'];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONObjectNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(7, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		expanded,
		getValue,
		keys
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(7, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
		if ('keys' in $$props) $$invalidate(5, keys = $$props.keys);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 128) {
			$$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}
	};

	return [
		key,
		isParentExpanded,
		isParentArray,
		nodeType,
		expanded,
		keys,
		getValue,
		value
	];
}

class JSONObjectNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4k, create_fragment$4l, safe_not_equal, {
			key: 0,
			value: 7,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONObjectNode",
			options,
			id: create_fragment$4l.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[7] === undefined && !('value' in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !('nodeType' in props)) {
			console.warn("<JSONObjectNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONObjectNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONObjectNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/JSONArrayNode.svelte generated by Svelte v3.44.2 */

const { Object: Object_1 } = globals;

function create_fragment$4k(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				isArray: true,
				keys: /*keys*/ ctx[5],
				previewKeys: /*previewKeys*/ ctx[6],
				getValue: /*getValue*/ ctx[7],
				label: "Array(" + /*value*/ ctx[1].length + ")",
				bracketOpen: "[",
				bracketClose: "]"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*previewKeys*/ 64) jsonnested_changes.previewKeys = /*previewKeys*/ ctx[6];
			if (dirty & /*value*/ 2) jsonnested_changes.label = "Array(" + /*value*/ ctx[1].length + ")";
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4j($$self, $$props, $$invalidate) {
	let keys;
	let previewKeys;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONArrayNode', slots, []);
	let { key, value, isParentExpanded, isParentArray } = $$props;
	let { expanded = false } = $$props;
	const filteredKey = new Set(['length']);

	function getValue(key) {
		return value[key];
	}

	const writable_props = ['key', 'value', 'isParentExpanded', 'isParentArray', 'expanded'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONArrayNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		filteredKey,
		getValue,
		keys,
		previewKeys
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
		if ('keys' in $$props) $$invalidate(5, keys = $$props.keys);
		if ('previewKeys' in $$props) $$invalidate(6, previewKeys = $$props.previewKeys);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			$$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}

		if ($$self.$$.dirty & /*keys*/ 32) {
			$$invalidate(6, previewKeys = keys.filter(key => !filteredKey.has(key)));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		keys,
		previewKeys,
		getValue
	];
}

class JSONArrayNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4j, create_fragment$4k, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONArrayNode",
			options,
			id: create_fragment$4k.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONArrayNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/JSONIterableArrayNode.svelte generated by Svelte v3.44.2 */

function create_fragment$4j(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey: getKey$1,
				getValue: getValue$1,
				isArray: true,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				bracketOpen: '{',
				bracketClose: '}'
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function getKey$1(key) {
	return String(key[0]);
}

function getValue$1(key) {
	return key[1];
}

function instance$4i($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONIterableArrayNode', slots, []);
	let { key, value, isParentExpanded, isParentArray, nodeType } = $$props;
	let keys = [];
	const writable_props = ['key', 'value', 'isParentExpanded', 'isParentArray', 'nodeType'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONIterableArrayNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		keys,
		getKey: getKey$1,
		getValue: getValue$1
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ('keys' in $$props) $$invalidate(4, keys = $$props.keys);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			{
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, entry]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableArrayNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4i, create_fragment$4j, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONIterableArrayNode",
			options,
			id: create_fragment$4j.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[5] === undefined && !('value' in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !('nodeType' in props)) {
			console.warn("<JSONIterableArrayNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONIterableArrayNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONIterableArrayNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

class MapEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

/* ../../../node_modules/svelte-json-tree/src/JSONIterableMapNode.svelte generated by Svelte v3.44.2 */

function create_fragment$4i(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey,
				getValue,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				colon: "",
				bracketOpen: '{',
				bracketClose: '}'
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function getKey(entry) {
	return entry[0];
}

function getValue(entry) {
	return entry[1];
}

function instance$4h($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONIterableMapNode', slots, []);
	let { key, value, isParentExpanded, isParentArray, nodeType } = $$props;
	let keys = [];
	const writable_props = ['key', 'value', 'isParentExpanded', 'isParentArray', 'nodeType'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONIterableMapNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		MapEntry,
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		keys,
		getKey,
		getValue
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ('keys' in $$props) $$invalidate(4, keys = $$props.keys);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			{
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, new MapEntry(entry[0], entry[1])]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableMapNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4h, create_fragment$4i, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONIterableMapNode",
			options,
			id: create_fragment$4i.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[5] === undefined && !('value' in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[1] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[2] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[3] === undefined && !('nodeType' in props)) {
			console.warn("<JSONIterableMapNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONIterableMapNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONIterableMapNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/JSONMapEntryNode.svelte generated by Svelte v3.44.2 */

function create_fragment$4h(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				key: /*isParentExpanded*/ ctx[2]
				? String(/*key*/ ctx[0])
				: /*value*/ ctx[1].key,
				keys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: /*isParentExpanded*/ ctx[2] ? 'Entry ' : '=> ',
				bracketOpen: '{',
				bracketClose: '}'
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(jsonnested.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonnested.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];

			if (dirty & /*isParentExpanded, key, value*/ 7) jsonnested_changes.key = /*isParentExpanded*/ ctx[2]
			? String(/*key*/ ctx[0])
			: /*value*/ ctx[1].key;

			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.label = /*isParentExpanded*/ ctx[2] ? 'Entry ' : '=> ';
			jsonnested.$set(jsonnested_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4g($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONMapEntryNode', slots, []);
	let { key, value, isParentExpanded, isParentArray } = $$props;
	let { expanded = false } = $$props;
	const keys = ['key', 'value'];

	function getValue(key) {
		return value[key];
	}

	const writable_props = ['key', 'value', 'isParentExpanded', 'isParentArray', 'expanded'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONMapEntryNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		JSONNested,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		keys,
		getValue
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [key, value, isParentExpanded, isParentArray, expanded, keys, getValue];
}

class JSONMapEntryNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4g, create_fragment$4h, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONMapEntryNode",
			options,
			id: create_fragment$4h.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONMapEntryNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<JSONMapEntryNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<JSONMapEntryNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/JSONValueNode.svelte generated by Svelte v3.44.2 */
const file$4e = "../../../node_modules/svelte-json-tree/src/JSONValueNode.svelte";

function create_fragment$4g(ctx) {
	let li;
	let jsonkey;
	let t0;
	let span;

	let t1_value = (/*valueGetter*/ ctx[2]
	? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
	: /*value*/ ctx[1]) + "";

	let t1;
	let span_class_value;
	let current;

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[0],
				colon: /*colon*/ ctx[6],
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t0 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t1 = claim_text(span_nodes, t1_value);
			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"));
			add_location(span, file$4e, 47, 2, 948);
			attr_dev(li, "class", "svelte-3bjyvl");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			add_location(li, file$4e, 45, 0, 846);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, li, anchor);
			mount_component(jsonkey, li, null);
			append_hydration_dev(li, t0);
			append_hydration_dev(li, span);
			append_hydration_dev(span, t1);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonkey_changes = {};
			if (dirty & /*key*/ 1) jsonkey_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);

			if ((!current || dirty & /*valueGetter, value*/ 6) && t1_value !== (t1_value = (/*valueGetter*/ ctx[2]
			? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
			: /*value*/ ctx[1]) + "")) set_data_dev(t1, t1_value);

			if (!current || dirty & /*nodeType*/ 32 && span_class_value !== (span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"))) {
				attr_dev(span, "class", span_class_value);
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonkey.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonkey.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(jsonkey);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4f($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONValueNode', slots, []);
	let { key, value, valueGetter = null, isParentExpanded, isParentArray, nodeType } = $$props;
	const { colon } = getContext(contextKey);
	const writable_props = ['key', 'value', 'valueGetter', 'isParentExpanded', 'isParentArray', 'nodeType'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONValueNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('valueGetter' in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
		if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(5, nodeType = $$props.nodeType);
	};

	$$self.$capture_state = () => ({
		getContext,
		contextKey,
		JSONKey,
		key,
		value,
		valueGetter,
		isParentExpanded,
		isParentArray,
		nodeType,
		colon
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('valueGetter' in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
		if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(5, nodeType = $$props.nodeType);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [key, value, valueGetter, isParentExpanded, isParentArray, nodeType, colon];
}

class JSONValueNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4f, create_fragment$4g, safe_not_equal, {
			key: 0,
			value: 1,
			valueGetter: 2,
			isParentExpanded: 3,
			isParentArray: 4,
			nodeType: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONValueNode",
			options,
			id: create_fragment$4g.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[3] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[4] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'isParentArray'");
		}

		if (/*nodeType*/ ctx[5] === undefined && !('nodeType' in props)) {
			console.warn("<JSONValueNode> was created without expected prop 'nodeType'");
		}
	}

	get key() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get valueGetter() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set valueGetter(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nodeType() {
		throw new Error("<JSONValueNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nodeType(value) {
		throw new Error("<JSONValueNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/ErrorNode.svelte generated by Svelte v3.44.2 */
const file$4d = "../../../node_modules/svelte-json-tree/src/ErrorNode.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

// (40:2) {#if isParentExpanded}
function create_if_block_2$2(ctx) {
	let jsonarrow;
	let current;

	jsonarrow = new JSONArrow({
			props: { expanded: /*expanded*/ ctx[0] },
			$$inline: true
		});

	jsonarrow.$on("click", /*toggleExpand*/ ctx[7]);

	const block = {
		c: function create() {
			create_component(jsonarrow.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(jsonarrow.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(jsonarrow, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
			jsonarrow.$set(jsonarrow_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonarrow.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonarrow.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonarrow, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(40:2) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (45:2) {#if isParentExpanded}
function create_if_block$6(ctx) {
	let ul;
	let current;
	let if_block = /*expanded*/ ctx[0] && create_if_block_1$4(ctx);

	const block = {
		c: function create() {
			ul = element("ul");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			if (if_block) if_block.l(ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-1ca3gb2");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			add_location(ul, file$4d, 45, 4, 1134);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, ul, anchor);
			if (if_block) if_block.m(ul, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*expanded*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*expanded*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$4(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(ul, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
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
			if (detaching) detach_dev(ul);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(45:2) {#if isParentExpanded}",
		ctx
	});

	return block;
}

// (47:6) {#if expanded}
function create_if_block_1$4(ctx) {
	let jsonnode;
	let t0;
	let li;
	let jsonkey;
	let t1;
	let span;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: "message",
				value: /*value*/ ctx[2].message
			},
			$$inline: true
		});

	jsonkey = new JSONKey({
			props: {
				key: "stack",
				colon: ":",
				isParentExpanded: /*isParentExpanded*/ ctx[3]
			},
			$$inline: true
		});

	let each_value = /*stack*/ ctx[5];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			create_component(jsonnode.$$.fragment);
			t0 = space();
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span = element("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			claim_component(jsonnode.$$.fragment, nodes);
			t0 = claim_space(nodes);
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t1 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(span_nodes);
			}

			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4d, 50, 10, 1330);
			attr_dev(li, "class", "svelte-1ca3gb2");
			add_location(li, file$4d, 48, 8, 1252);
		},
		m: function mount(target, anchor) {
			mount_component(jsonnode, target, anchor);
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, li, anchor);
			mount_component(jsonkey, li, null);
			append_hydration_dev(li, t1);
			append_hydration_dev(li, span);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const jsonnode_changes = {};
			if (dirty & /*value*/ 4) jsonnode_changes.value = /*value*/ ctx[2].message;
			jsonnode.$set(jsonnode_changes);
			const jsonkey_changes = {};
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			jsonkey.$set(jsonkey_changes);

			if (dirty & /*stack*/ 32) {
				each_value = /*stack*/ ctx[5];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(span, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			transition_in(jsonkey.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnode.$$.fragment, local);
			transition_out(jsonkey.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(jsonnode, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(li);
			destroy_component(jsonkey);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(47:6) {#if expanded}",
		ctx
	});

	return block;
}

// (52:12) {#each stack as line, index}
function create_each_block$3(ctx) {
	let span;
	let t_value = /*line*/ ctx[8] + "";
	let t;
	let br;

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			br = element("br");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			br = claim_element(nodes, "BR", {});
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-1ca3gb2");
			toggle_class(span, "indent", /*index*/ ctx[10] > 0);
			add_location(span, file$4d, 52, 14, 1392);
			add_location(br, file$4d, 52, 58, 1436);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, span, anchor);
			append_hydration_dev(span, t);
			insert_hydration_dev(target, br, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*stack*/ 32 && t_value !== (t_value = /*line*/ ctx[8] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (detaching) detach_dev(br);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$3.name,
		type: "each",
		source: "(52:12) {#each stack as line, index}",
		ctx
	});

	return block;
}

function create_fragment$4f(ctx) {
	let li;
	let t0;
	let jsonkey;
	let t1;
	let span;
	let t2;
	let t3_value = (/*expanded*/ ctx[0] ? '' : /*value*/ ctx[2].message) + "";
	let t3;
	let t4;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*isParentExpanded*/ ctx[3] && create_if_block_2$2(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[1],
				colon: /*context*/ ctx[6].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			},
			$$inline: true
		});

	let if_block1 = /*isParentExpanded*/ ctx[3] && create_if_block$6(ctx);

	const block = {
		c: function create() {
			li = element("li");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span = element("span");
			t2 = text("Error: ");
			t3 = text(t3_value);
			t4 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			if (if_block0) if_block0.l(li_nodes);
			t0 = claim_space(li_nodes);
			claim_component(jsonkey.$$.fragment, li_nodes);
			t1 = claim_space(li_nodes);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			t2 = claim_text(span_nodes, "Error: ");
			t3 = claim_text(span_nodes, t3_value);
			span_nodes.forEach(detach_dev);
			t4 = claim_space(li_nodes);
			if (if_block1) if_block1.l(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4d, 43, 2, 1033);
			attr_dev(li, "class", "svelte-1ca3gb2");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			add_location(li, file$4d, 38, 0, 831);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, li, anchor);
			if (if_block0) if_block0.m(li, null);
			append_hydration_dev(li, t0);
			mount_component(jsonkey, li, null);
			append_hydration_dev(li, t1);
			append_hydration_dev(li, span);
			append_hydration_dev(span, t2);
			append_hydration_dev(span, t3);
			append_hydration_dev(li, t4);
			if (if_block1) if_block1.m(li, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(span, "click", /*toggleExpand*/ ctx[7], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(li, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 2) jsonkey_changes.key = /*key*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);
			if ((!current || dirty & /*expanded, value*/ 5) && t3_value !== (t3_value = (/*expanded*/ ctx[0] ? '' : /*value*/ ctx[2].message) + "")) set_data_dev(t3, t3_value);

			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$6(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(li, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(jsonkey.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(jsonkey.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (if_block0) if_block0.d();
			destroy_component(jsonkey);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4e($$self, $$props, $$invalidate) {
	let stack;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ErrorNode', slots, []);
	let { key, value, isParentExpanded, isParentArray } = $$props;
	let { expanded = false } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon: ':' });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	const writable_props = ['key', 'value', 'isParentExpanded', 'isParentArray', 'expanded'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ErrorNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(1, key = $$props.key);
		if ('value' in $$props) $$invalidate(2, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	$$self.$capture_state = () => ({
		getContext,
		setContext,
		contextKey,
		JSONArrow,
		JSONNode,
		JSONKey,
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		context,
		toggleExpand,
		stack
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(1, key = $$props.key);
		if ('value' in $$props) $$invalidate(2, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ('stack' in $$props) $$invalidate(5, stack = $$props.stack);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 4) {
			$$invalidate(5, stack = value.stack.split('\n'));
		}

		if ($$self.$$.dirty & /*isParentExpanded*/ 8) {
			if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}
	};

	return [
		expanded,
		key,
		value,
		isParentExpanded,
		isParentArray,
		stack,
		context,
		toggleExpand
	];
}

class ErrorNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4e, create_fragment$4f, safe_not_equal, {
			key: 1,
			value: 2,
			isParentExpanded: 3,
			isParentArray: 4,
			expanded: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ErrorNode",
			options,
			id: create_fragment$4f.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[1] === undefined && !('key' in props)) {
			console.warn("<ErrorNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[2] === undefined && !('value' in props)) {
			console.warn("<ErrorNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[3] === undefined && !('isParentExpanded' in props)) {
			console.warn("<ErrorNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[4] === undefined && !('isParentArray' in props)) {
			console.warn("<ErrorNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<ErrorNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<ErrorNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }
    return obj.constructor.name;
  }

  return type;
}

/* ../../../node_modules/svelte-json-tree/src/JSONNode.svelte generated by Svelte v3.44.2 */

function create_fragment$4e(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*componentType*/ ctx[6];

	function switch_props(ctx) {
		return {
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				nodeType: /*nodeType*/ ctx[4],
				valueGetter: /*valueGetter*/ ctx[5]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_hydration_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const switch_instance_changes = {};
			if (dirty & /*key*/ 1) switch_instance_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) switch_instance_changes.value = /*value*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 4) switch_instance_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) switch_instance_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*nodeType*/ 16) switch_instance_changes.nodeType = /*nodeType*/ ctx[4];
			if (dirty & /*valueGetter*/ 32) switch_instance_changes.valueGetter = /*valueGetter*/ ctx[5];

			if (switch_value !== (switch_value = /*componentType*/ ctx[6])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4d($$self, $$props, $$invalidate) {
	let nodeType;
	let componentType;
	let valueGetter;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('JSONNode', slots, []);
	let { key, value, isParentExpanded, isParentArray } = $$props;

	function getComponent(nodeType) {
		switch (nodeType) {
			case 'Object':
				return JSONObjectNode;
			case 'Error':
				return ErrorNode;
			case 'Array':
				return JSONArrayNode;
			case 'Iterable':
			case 'Map':
			case 'Set':
				return typeof value.set === 'function'
				? JSONIterableMapNode
				: JSONIterableArrayNode;
			case 'MapEntry':
				return JSONMapEntryNode;
			default:
				return JSONValueNode;
		}
	}

	function getValueGetter(nodeType) {
		switch (nodeType) {
			case 'Object':
			case 'Error':
			case 'Array':
			case 'Iterable':
			case 'Map':
			case 'Set':
			case 'MapEntry':
			case 'Number':
				return undefined;
			case 'String':
				return raw => `"${raw}"`;
			case 'Boolean':
				return raw => raw ? 'true' : 'false';
			case 'Date':
				return raw => raw.toISOString();
			case 'Null':
				return () => 'null';
			case 'Undefined':
				return () => 'undefined';
			case 'Function':
			case 'Symbol':
				return raw => raw.toString();
			default:
				return () => `<${nodeType}>`;
		}
	}

	const writable_props = ['key', 'value', 'isParentExpanded', 'isParentArray'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JSONNode> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
	};

	$$self.$capture_state = () => ({
		JSONObjectNode,
		JSONArrayNode,
		JSONIterableArrayNode,
		JSONIterableMapNode,
		JSONMapEntryNode,
		JSONValueNode,
		ErrorNode,
		objType,
		key,
		value,
		isParentExpanded,
		isParentArray,
		getComponent,
		getValueGetter,
		nodeType,
		valueGetter,
		componentType
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(4, nodeType = $$props.nodeType);
		if ('valueGetter' in $$props) $$invalidate(5, valueGetter = $$props.valueGetter);
		if ('componentType' in $$props) $$invalidate(6, componentType = $$props.componentType);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			$$invalidate(4, nodeType = objType(value));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			$$invalidate(6, componentType = getComponent(nodeType));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			$$invalidate(5, valueGetter = getValueGetter(nodeType));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		valueGetter,
		componentType
	];
}

class JSONNode extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4d, create_fragment$4e, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "JSONNode",
			options,
			id: create_fragment$4e.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[0] === undefined && !('key' in props)) {
			console.warn("<JSONNode> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
			console.warn("<JSONNode> was created without expected prop 'value'");
		}

		if (/*isParentExpanded*/ ctx[2] === undefined && !('isParentExpanded' in props)) {
			console.warn("<JSONNode> was created without expected prop 'isParentExpanded'");
		}

		if (/*isParentArray*/ ctx[3] === undefined && !('isParentArray' in props)) {
			console.warn("<JSONNode> was created without expected prop 'isParentArray'");
		}
	}

	get key() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentExpanded() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentExpanded(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isParentArray() {
		throw new Error("<JSONNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isParentArray(value) {
		throw new Error("<JSONNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../../node_modules/svelte-json-tree/src/Root.svelte generated by Svelte v3.44.2 */
const file$4c = "../../../node_modules/svelte-json-tree/src/Root.svelte";

function create_fragment$4d(ctx) {
	let ul;
	let jsonnode;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: true,
				isParentArray: false
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			ul = element("ul");
			create_component(jsonnode.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			claim_component(jsonnode.$$.fragment, ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-773n60");
			add_location(ul, file$4c, 37, 0, 1295);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, ul, anchor);
			mount_component(jsonnode, ul, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const jsonnode_changes = {};
			if (dirty & /*key*/ 1) jsonnode_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) jsonnode_changes.value = /*value*/ ctx[1];
			jsonnode.$set(jsonnode_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsonnode.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			destroy_component(jsonnode);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4c($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Root', slots, []);
	setContext(contextKey, {});
	let { key = '', value } = $$props;
	const writable_props = ['key', 'value'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Root> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
	};

	$$self.$capture_state = () => ({
		JSONNode,
		setContext,
		contextKey,
		key,
		value
	});

	$$self.$inject_state = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [key, value];
}

class Root extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4c, create_fragment$4d, safe_not_equal, { key: 0, value: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Root",
			options,
			id: create_fragment$4d.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
			console.warn("<Root> was created without expected prop 'value'");
		}
	}

	get key() {
		throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/node_modules/app/components/Elements.svelte generated by Svelte v3.44.2 */

const file$4b = "src/node_modules/app/components/Elements.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i].tag;
	child_ctx[2] = list[i].content;
	return child_ctx;
}

// (8:25) 
function create_if_block_1$3(ctx) {
	let pre;
	let t_value = /*content*/ ctx[2] + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file$4b, 8, 2, 143);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, pre, anchor);
			append_hydration_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*elements*/ 1 && t_value !== (t_value = /*content*/ ctx[2] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(8:25) ",
		ctx
	});

	return block;
}

// (6:1) {#if tag === 'p'}
function create_if_block$5(ctx) {
	let p;
	let t_value = /*content*/ ctx[2] + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file$4b, 6, 2, 98);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, p, anchor);
			append_hydration_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*elements*/ 1 && t_value !== (t_value = /*content*/ ctx[2] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(6:1) {#if tag === 'p'}",
		ctx
	});

	return block;
}

// (5:0) {#each elements as {tag, content}}
function create_each_block$2(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*tag*/ ctx[1] === 'p') return create_if_block$5;
		if (/*tag*/ ctx[1] === 'pre') return create_if_block_1$3;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if (if_block) {
				if_block.d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(5:0) {#each elements as {tag, content}}",
		ctx
	});

	return block;
}

function create_fragment$4c(ctx) {
	let each_1_anchor;
	let each_value = /*elements*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_hydration_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*elements*/ 1) {
				each_value = /*elements*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4b($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Elements', slots, []);
	let { elements } = $$props;
	const writable_props = ['elements'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Elements> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('elements' in $$props) $$invalidate(0, elements = $$props.elements);
	};

	$$self.$capture_state = () => ({ elements });

	$$self.$inject_state = $$props => {
		if ('elements' in $$props) $$invalidate(0, elements = $$props.elements);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [elements];
}

class Elements extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4b, create_fragment$4c, safe_not_equal, { elements: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Elements",
			options,
			id: create_fragment$4c.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*elements*/ ctx[0] === undefined && !('elements' in props)) {
			console.warn("<Elements> was created without expected prop 'elements'");
		}
	}

	get elements() {
		throw new Error("<Elements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set elements(value) {
		throw new Error("<Elements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var barchart = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BarchartVDiv: BarchartVDiv
});

/* ../../components/choropleth/src/ChoroplethDiv.svelte generated by Svelte v3.44.2 */
const file$4a = "../../components/choropleth/src/ChoroplethDiv.svelte";

// (45:1) {#if title}
function create_if_block$4(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[0]);
			h2_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-77ac80");
			add_location(h2, file$4a, 46, 3, 1007);
			attr_dev(header, "class", "svelte-77ac80");
			add_location(header, file$4a, 45, 2, 995);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, header, anchor);
			append_hydration_dev(header, h2);
			append_hydration_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(45:1) {#if title}",
		ctx
	});

	return block;
}

function create_fragment$4b(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let choroplethg;
	let main_resize_listener;
	let current;
	let if_block = /*title*/ ctx[0] && create_if_block$4(ctx);

	choroplethg = new ChoroplethG({
			props: {
				focusedKey: /*focusedKey*/ ctx[5],
				geometry: /*geometry*/ ctx[6],
				height: /*height*/ ctx[16],
				isInteractive: /*isInteractive*/ ctx[7],
				key_alt: /*key_alt*/ ctx[4],
				key: /*key*/ ctx[3],
				keyToColor: /*keyToColor*/ ctx[8],
				keyToColorFn: /*keyToColorFn*/ ctx[9],
				message: /*message*/ ctx[10],
				projection: /*projection*/ ctx[11],
				projectionFn: /*projectionFn*/ ctx[12],
				projectionId: /*projectionId*/ ctx[13],
				selectedKeys: /*selectedKeys*/ ctx[14],
				theme: /*theme*/ ctx[15],
				topojson: /*topojson*/ ctx[1],
				topojsonId: /*topojsonId*/ ctx[2],
				width: /*width*/ ctx[17]
			},
			$$inline: true
		});

	choroplethg.$on("clicked", /*clicked_handler*/ ctx[21]);
	choroplethg.$on("entered", /*entered_handler*/ ctx[22]);
	choroplethg.$on("exited", /*exited_handler*/ ctx[23]);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block) if_block.c();
			t = space();
			main = element("main");
			svg = svg_element("svg");
			create_component(choroplethg.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block) if_block.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			svg = claim_svg_element(main_nodes, "svg", { width: true, height: true, class: true });
			var svg_nodes = children(svg);
			claim_component(choroplethg.$$.fragment, svg_nodes);
			svg_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[17]);
			attr_dev(svg, "height", /*height*/ ctx[16]);
			attr_dev(svg, "class", "svelte-77ac80");
			add_location(svg, file$4a, 54, 2, 1150);
			attr_dev(main, "class", "svelte-77ac80");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[24].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$4a, 49, 1, 1044);
			attr_dev(div, "class", "ChoroplethDiv svelte-77ac80");
			attr_dev(div, "style", /*style*/ ctx[18]);
			toggle_class(div, "interactive", /*isInteractive*/ ctx[7]);
			add_location(div, file$4a, 39, 0, 906);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append_hydration_dev(div, t);
			append_hydration_dev(div, main);
			append_hydration_dev(main, svg);
			mount_component(choroplethg, svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[24].bind(main));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					if_block.m(div, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			const choroplethg_changes = {};
			if (dirty & /*focusedKey*/ 32) choroplethg_changes.focusedKey = /*focusedKey*/ ctx[5];
			if (dirty & /*geometry*/ 64) choroplethg_changes.geometry = /*geometry*/ ctx[6];
			if (dirty & /*height*/ 65536) choroplethg_changes.height = /*height*/ ctx[16];
			if (dirty & /*isInteractive*/ 128) choroplethg_changes.isInteractive = /*isInteractive*/ ctx[7];
			if (dirty & /*key_alt*/ 16) choroplethg_changes.key_alt = /*key_alt*/ ctx[4];
			if (dirty & /*key*/ 8) choroplethg_changes.key = /*key*/ ctx[3];
			if (dirty & /*keyToColor*/ 256) choroplethg_changes.keyToColor = /*keyToColor*/ ctx[8];
			if (dirty & /*keyToColorFn*/ 512) choroplethg_changes.keyToColorFn = /*keyToColorFn*/ ctx[9];
			if (dirty & /*message*/ 1024) choroplethg_changes.message = /*message*/ ctx[10];
			if (dirty & /*projection*/ 2048) choroplethg_changes.projection = /*projection*/ ctx[11];
			if (dirty & /*projectionFn*/ 4096) choroplethg_changes.projectionFn = /*projectionFn*/ ctx[12];
			if (dirty & /*projectionId*/ 8192) choroplethg_changes.projectionId = /*projectionId*/ ctx[13];
			if (dirty & /*selectedKeys*/ 16384) choroplethg_changes.selectedKeys = /*selectedKeys*/ ctx[14];
			if (dirty & /*theme*/ 32768) choroplethg_changes.theme = /*theme*/ ctx[15];
			if (dirty & /*topojson*/ 2) choroplethg_changes.topojson = /*topojson*/ ctx[1];
			if (dirty & /*topojsonId*/ 4) choroplethg_changes.topojsonId = /*topojsonId*/ ctx[2];
			if (dirty & /*width*/ 131072) choroplethg_changes.width = /*width*/ ctx[17];
			choroplethg.$set(choroplethg_changes);

			if (!current || dirty & /*width*/ 131072) {
				attr_dev(svg, "width", /*width*/ ctx[17]);
			}

			if (!current || dirty & /*height*/ 65536) {
				attr_dev(svg, "height", /*height*/ ctx[16]);
			}

			if (dirty & /*title*/ 1) {
				toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			}

			if (!current || dirty & /*style*/ 262144) {
				attr_dev(div, "style", /*style*/ ctx[18]);
			}

			if (dirty & /*isInteractive*/ 128) {
				toggle_class(div, "interactive", /*isInteractive*/ ctx[7]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(choroplethg.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(choroplethg.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block) if_block.d();
			destroy_component(choroplethg);
			main_resize_listener();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4a($$self, $$props, $$invalidate) {
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ChoroplethDiv', slots, []);
	let { headerHeight } = $$props;
	let { padding } = $$props;
	let { title } = $$props;
	let { topojson = null } = $$props;
	let { topojsonId = null } = $$props;
	let { key = null } = $$props;
	let { key_alt = null } = $$props;
	let { focusedKey = null } = $$props;
	let { geometry = null } = $$props;
	let { isInteractive = false } = $$props;
	let { keyToColor = null } = $$props;
	let { keyToColorFn = null } = $$props;
	let { message = null } = $$props;
	let { projection = null } = $$props;
	let { projectionFn = null } = $$props;
	let { projectionId = null } = $$props;
	let { selectedKeys = [] } = $$props;
	let { theme = null } = $$props;
	let height = 0;
	let width = 0;

	const writable_props = [
		'headerHeight',
		'padding',
		'title',
		'topojson',
		'topojsonId',
		'key',
		'key_alt',
		'focusedKey',
		'geometry',
		'isInteractive',
		'keyToColor',
		'keyToColorFn',
		'message',
		'projection',
		'projectionFn',
		'projectionId',
		'selectedKeys',
		'theme'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChoroplethDiv> was created with unknown prop '${key}'`);
	});

	function clicked_handler(event) {
		bubble.call(this, $$self, event);
	}

	function entered_handler(event) {
		bubble.call(this, $$self, event);
	}

	function exited_handler(event) {
		bubble.call(this, $$self, event);
	}

	function main_elementresize_handler() {
		width = this.clientWidth;
		height = this.clientHeight;
		$$invalidate(17, width);
		$$invalidate(16, height);
	}

	$$self.$$set = $$props => {
		if ('headerHeight' in $$props) $$invalidate(19, headerHeight = $$props.headerHeight);
		if ('padding' in $$props) $$invalidate(20, padding = $$props.padding);
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('topojson' in $$props) $$invalidate(1, topojson = $$props.topojson);
		if ('topojsonId' in $$props) $$invalidate(2, topojsonId = $$props.topojsonId);
		if ('key' in $$props) $$invalidate(3, key = $$props.key);
		if ('key_alt' in $$props) $$invalidate(4, key_alt = $$props.key_alt);
		if ('focusedKey' in $$props) $$invalidate(5, focusedKey = $$props.focusedKey);
		if ('geometry' in $$props) $$invalidate(6, geometry = $$props.geometry);
		if ('isInteractive' in $$props) $$invalidate(7, isInteractive = $$props.isInteractive);
		if ('keyToColor' in $$props) $$invalidate(8, keyToColor = $$props.keyToColor);
		if ('keyToColorFn' in $$props) $$invalidate(9, keyToColorFn = $$props.keyToColorFn);
		if ('message' in $$props) $$invalidate(10, message = $$props.message);
		if ('projection' in $$props) $$invalidate(11, projection = $$props.projection);
		if ('projectionFn' in $$props) $$invalidate(12, projectionFn = $$props.projectionFn);
		if ('projectionId' in $$props) $$invalidate(13, projectionId = $$props.projectionId);
		if ('selectedKeys' in $$props) $$invalidate(14, selectedKeys = $$props.selectedKeys);
		if ('theme' in $$props) $$invalidate(15, theme = $$props.theme);
	};

	$$self.$capture_state = () => ({
		makeStyleVars,
		ChoroplethG,
		headerHeight,
		padding,
		title,
		topojson,
		topojsonId,
		key,
		key_alt,
		focusedKey,
		geometry,
		isInteractive,
		keyToColor,
		keyToColorFn,
		message,
		projection,
		projectionFn,
		projectionId,
		selectedKeys,
		theme,
		height,
		width,
		style
	});

	$$self.$inject_state = $$props => {
		if ('headerHeight' in $$props) $$invalidate(19, headerHeight = $$props.headerHeight);
		if ('padding' in $$props) $$invalidate(20, padding = $$props.padding);
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('topojson' in $$props) $$invalidate(1, topojson = $$props.topojson);
		if ('topojsonId' in $$props) $$invalidate(2, topojsonId = $$props.topojsonId);
		if ('key' in $$props) $$invalidate(3, key = $$props.key);
		if ('key_alt' in $$props) $$invalidate(4, key_alt = $$props.key_alt);
		if ('focusedKey' in $$props) $$invalidate(5, focusedKey = $$props.focusedKey);
		if ('geometry' in $$props) $$invalidate(6, geometry = $$props.geometry);
		if ('isInteractive' in $$props) $$invalidate(7, isInteractive = $$props.isInteractive);
		if ('keyToColor' in $$props) $$invalidate(8, keyToColor = $$props.keyToColor);
		if ('keyToColorFn' in $$props) $$invalidate(9, keyToColorFn = $$props.keyToColorFn);
		if ('message' in $$props) $$invalidate(10, message = $$props.message);
		if ('projection' in $$props) $$invalidate(11, projection = $$props.projection);
		if ('projectionFn' in $$props) $$invalidate(12, projectionFn = $$props.projectionFn);
		if ('projectionId' in $$props) $$invalidate(13, projectionId = $$props.projectionId);
		if ('selectedKeys' in $$props) $$invalidate(14, selectedKeys = $$props.selectedKeys);
		if ('theme' in $$props) $$invalidate(15, theme = $$props.theme);
		if ('height' in $$props) $$invalidate(16, height = $$props.height);
		if ('width' in $$props) $$invalidate(17, width = $$props.width);
		if ('style' in $$props) $$invalidate(18, style = $$props.style);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*padding*/ 1048576) {
			$$invalidate(20, padding = padding || '10px');
		}

		if ($$self.$$.dirty & /*headerHeight*/ 524288) {
			$$invalidate(19, headerHeight = headerHeight || '2rem');
		}

		if ($$self.$$.dirty & /*headerHeight, padding*/ 1572864) {
			$$invalidate(18, style = makeStyleVars({ headerHeight, padding }));
		}
	};

	return [
		title,
		topojson,
		topojsonId,
		key,
		key_alt,
		focusedKey,
		geometry,
		isInteractive,
		keyToColor,
		keyToColorFn,
		message,
		projection,
		projectionFn,
		projectionId,
		selectedKeys,
		theme,
		height,
		width,
		style,
		headerHeight,
		padding,
		clicked_handler,
		entered_handler,
		exited_handler,
		main_elementresize_handler
	];
}

class ChoroplethDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4a, create_fragment$4b, safe_not_equal, {
			headerHeight: 19,
			padding: 20,
			title: 0,
			topojson: 1,
			topojsonId: 2,
			key: 3,
			key_alt: 4,
			focusedKey: 5,
			geometry: 6,
			isInteractive: 7,
			keyToColor: 8,
			keyToColorFn: 9,
			message: 10,
			projection: 11,
			projectionFn: 12,
			projectionId: 13,
			selectedKeys: 14,
			theme: 15
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChoroplethDiv",
			options,
			id: create_fragment$4b.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*headerHeight*/ ctx[19] === undefined && !('headerHeight' in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'headerHeight'");
		}

		if (/*padding*/ ctx[20] === undefined && !('padding' in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'padding'");
		}

		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
			console.warn("<ChoroplethDiv> was created without expected prop 'title'");
		}
	}

	get headerHeight() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set headerHeight(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get padding() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set padding(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojson() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojson(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get topojsonId() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set topojsonId(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key_alt() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key_alt(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focusedKey() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set focusedKey(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInteractive() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInteractive(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColor() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColor(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keyToColorFn() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keyToColorFn(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get message() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set message(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projection() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projection(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projectionFn() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projectionFn(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get projectionId() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set projectionId(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedKeys() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedKeys(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<ChoroplethDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<ChoroplethDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var ChoroplethDiv$1 = ChoroplethDiv;

var choropleth = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ChoroplethG: ChoroplethG,
  ChoroplethDiv: ChoroplethDiv$1,
  projections: projections,
  defaultGeometry: defaultGeometry
});

/* ../../components/histogram/src/HistogramG.svelte generated by Svelte v3.44.2 */
const file$49 = "../../components/histogram/src/HistogramG.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[52] = list[i].tick;
	child_ctx[53] = list[i].y;
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[56] = list[i].barLength;
	child_ctx[57] = list[i].barThickness;
	child_ctx[58] = list[i].displayValue;
	child_ctx[59] = list[i].fill;
	child_ctx[60] = list[i].labelAnchor;
	child_ctx[61] = list[i].labelX;
	child_ctx[62] = list[i].selected;
	child_ctx[63] = list[i].x;
	child_ctx[64] = list[i].y1;
	child_ctx[66] = i;
	return child_ctx;
}

// (327:0) {#if height && width}
function create_if_block$3(ctx) {
	let g;

	function select_block_type(ctx, dirty) {
		if (/*bins*/ ctx[0].length === 0) return create_if_block_1$2;
		return create_else_block$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			g = svg_element("g");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { style: true, class: true });
			var g_nodes = children(g);
			if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "style", /*style*/ ctx[13]);
			attr_dev(g, "class", "HistogramG svelte-1egg7b");
			toggle_class(g, "interactive", /*flags*/ ctx[1].isInteractive);
			add_location(g, file$49, 327, 1, 7992);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			if_block.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(g, null);
				}
			}

			if (dirty[0] & /*style*/ 8192) {
				attr_dev(g, "style", /*style*/ ctx[13]);
			}

			if (dirty[0] & /*flags*/ 2) {
				toggle_class(g, "interactive", /*flags*/ ctx[1].isInteractive);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(327:0) {#if height && width}",
		ctx
	});

	return block;
}

// (341:2) {:else}
function create_else_block$1(ctx) {
	let if_block0_anchor;
	let g1;
	let g0;
	let line;
	let line_y__value;
	let if_block2_anchor;
	let g0_transform_value;
	let g1_transform_value;
	let if_block0 = /*flags*/ ctx[1].withBackground && create_if_block_8(ctx);
	let if_block1 = /*flags*/ ctx[1].isInteractive && create_if_block_7(ctx);
	let each_value_1 = /*bars*/ ctx[8];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	let if_block2 = !/*flags*/ ctx[1].hideOrigin && create_if_block_4(ctx);
	let if_block3 = !/*flags*/ ctx[1].hideTicks && create_if_block_3(ctx);
	let if_block4 = /*isBrushing*/ ctx[7] && create_if_block_2$1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			g1 = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			g0 = svg_element("g");
			line = svg_element("line");
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			if (if_block3) if_block3.c();
			if (if_block4) if_block4.c();
			this.h();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			if_block0_anchor = empty();
			if (if_block1) if_block1.l(nodes);
			g1 = claim_svg_element(nodes, "g", { transform: true });
			var g1_nodes = children(g1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g1_nodes);
			}

			g0 = claim_svg_element(g1_nodes, "g", { class: true, transform: true });
			var g0_nodes = children(g0);
			line = claim_svg_element(g0_nodes, "line", { y2: true, class: true });
			children(line).forEach(detach_dev);
			if (if_block2) if_block2.l(g0_nodes);
			if_block2_anchor = empty();
			if (if_block3) if_block3.l(g0_nodes);
			g0_nodes.forEach(detach_dev);
			if (if_block4) if_block4.l(g1_nodes);
			g1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "y2", line_y__value = /*flags*/ ctx[1].isTopDown
			? /*innerHeight*/ ctx[9]
			: -/*innerHeight*/ ctx[9]);

			attr_dev(line, "class", "svelte-1egg7b");
			add_location(line, file$49, 412, 5, 9648);
			attr_dev(g0, "class", "axis svelte-1egg7b");
			attr_dev(g0, "transform", g0_transform_value = "translate(" + /*origin*/ ctx[19].x + "," + /*origin*/ ctx[19].y + ")");
			add_location(g0, file$49, 408, 4, 9568);
			attr_dev(g1, "transform", g1_transform_value = "translate(" + /*safety*/ ctx[11].left + "," + /*safety*/ ctx[11].top + ")");
			add_location(g1, file$49, 358, 3, 8525);
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_hydration_dev(target, if_block0_anchor, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_hydration_dev(target, g1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g1, null);
			}

			append_hydration_dev(g1, g0);
			append_hydration_dev(g0, line);
			if (if_block2) if_block2.m(g0, null);
			append_hydration_dev(g0, if_block2_anchor);
			if (if_block3) if_block3.m(g0, null);
			if (if_block4) if_block4.m(g1, null);
		},
		p: function update(ctx, dirty) {
			if (/*flags*/ ctx[1].withBackground) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_8(ctx);
					if_block0.c();
					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*flags*/ ctx[1].isInteractive) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_7(ctx);
					if_block1.c();
					if_block1.m(g1.parentNode, g1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*bars, innerWidth, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags, fontSize*/ 65049858) {
				each_value_1 = /*bars*/ ctx[8];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g1, g0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty[0] & /*flags, innerHeight*/ 514 && line_y__value !== (line_y__value = /*flags*/ ctx[1].isTopDown
			? /*innerHeight*/ ctx[9]
			: -/*innerHeight*/ ctx[9])) {
				attr_dev(line, "y2", line_y__value);
			}

			if (!/*flags*/ ctx[1].hideOrigin) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_4(ctx);
					if_block2.c();
					if_block2.m(g0, if_block2_anchor);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!/*flags*/ ctx[1].hideTicks) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_3(ctx);
					if_block3.c();
					if_block3.m(g0, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty[0] & /*origin*/ 524288 && g0_transform_value !== (g0_transform_value = "translate(" + /*origin*/ ctx[19].x + "," + /*origin*/ ctx[19].y + ")")) {
				attr_dev(g0, "transform", g0_transform_value);
			}

			if (/*isBrushing*/ ctx[7]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_2$1(ctx);
					if_block4.c();
					if_block4.m(g1, null);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (dirty[0] & /*safety*/ 2048 && g1_transform_value !== (g1_transform_value = "translate(" + /*safety*/ ctx[11].left + "," + /*safety*/ ctx[11].top + ")")) {
				attr_dev(g1, "transform", g1_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(if_block0_anchor);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(g1);
			destroy_each(each_blocks, detaching);
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(341:2) {:else}",
		ctx
	});

	return block;
}

// (333:2) {#if bins.length === 0}
function create_if_block_1$2(ctx) {
	let text_1;
	let t;
	let text_1_x_value;
	let text_1_y_value;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(/*message*/ ctx[3]);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_svg_element(nodes, "text", { class: true, x: true, y: true });
			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, /*message*/ ctx[3]);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "class", "message svelte-1egg7b");
			attr_dev(text_1, "x", text_1_x_value = /*width*/ ctx[6] / 2);
			attr_dev(text_1, "y", text_1_y_value = /*height*/ ctx[5] / 2);
			add_location(text_1, file$49, 334, 3, 8101);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, text_1, anchor);
			append_hydration_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*message*/ 8) set_data_dev(t, /*message*/ ctx[3]);

			if (dirty[0] & /*width*/ 64 && text_1_x_value !== (text_1_x_value = /*width*/ ctx[6] / 2)) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*height*/ 32 && text_1_y_value !== (text_1_y_value = /*height*/ ctx[5] / 2)) {
				attr_dev(text_1, "y", text_1_y_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(333:2) {#if bins.length === 0}",
		ctx
	});

	return block;
}

// (344:3) {#if flags.withBackground}
function create_if_block_8(ctx) {
	let rect;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", { class: true, width: true, height: true });
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "bkg svelte-1egg7b");
			attr_dev(rect, "width", /*width*/ ctx[6]);
			attr_dev(rect, "height", /*height*/ ctx[5]);
			add_location(rect, file$49, 344, 4, 8250);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*width*/ 64) {
				attr_dev(rect, "width", /*width*/ ctx[6]);
			}

			if (dirty[0] & /*height*/ 32) {
				attr_dev(rect, "height", /*height*/ ctx[5]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(344:3) {#if flags.withBackground}",
		ctx
	});

	return block;
}

// (349:3) {#if flags.isInteractive}
function create_if_block_7(ctx) {
	let rect;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", { height: true, width: true, class: true });
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*height*/ ctx[5]);
			attr_dev(rect, "width", /*width*/ ctx[6]);
			attr_dev(rect, "class", "bkgSensor svelte-1egg7b");
			toggle_class(rect, "reset", /*selectedBins*/ ctx[4].length > 0);
			add_location(rect, file$49, 349, 4, 8375);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);

			if (!mounted) {
				dispose = listen_dev(rect, "click", /*resetSelection*/ ctx[26], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*height*/ 32) {
				attr_dev(rect, "height", /*height*/ ctx[5]);
			}

			if (dirty[0] & /*width*/ 64) {
				attr_dev(rect, "width", /*width*/ ctx[6]);
			}

			if (dirty[0] & /*selectedBins*/ 16) {
				toggle_class(rect, "reset", /*selectedBins*/ ctx[4].length > 0);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(349:3) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (375:6) {#if displayValue}
function create_if_block_6(ctx) {
	let rect;
	let rect_fill_value;
	let rect_x_value;
	let rect_height_value;
	let rect_width_value;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				fill: true,
				x: true,
				class: true,
				height: true,
				width: true
			});

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "fill", rect_fill_value = /*fill*/ ctx[59]);
			attr_dev(rect, "x", rect_x_value = /*x*/ ctx[63]);
			attr_dev(rect, "class", "bar svelte-1egg7b");
			attr_dev(rect, "height", rect_height_value = /*barThickness*/ ctx[57]);
			attr_dev(rect, "width", rect_width_value = /*barLength*/ ctx[56]);
			toggle_class(rect, "selected", /*selected*/ ctx[62]);
			add_location(rect, file$49, 375, 7, 8843);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*bars*/ 256 && rect_fill_value !== (rect_fill_value = /*fill*/ ctx[59])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*bars*/ 256 && rect_x_value !== (rect_x_value = /*x*/ ctx[63])) {
				attr_dev(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*bars*/ 256 && rect_height_value !== (rect_height_value = /*barThickness*/ ctx[57])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*bars*/ 256 && rect_width_value !== (rect_width_value = /*barLength*/ ctx[56])) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*bars*/ 256) {
				toggle_class(rect, "selected", /*selected*/ ctx[62]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(375:6) {#if displayValue}",
		ctx
	});

	return block;
}

// (394:6) {#if flags.isInteractive}
function create_if_block_5(ctx) {
	let rect;
	let rect_height_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", { class: true, height: true, width: true });
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "sensor svelte-1egg7b");
			attr_dev(rect, "height", rect_height_value = /*barThickness*/ ctx[57]);
			attr_dev(rect, "width", /*innerWidth*/ ctx[10]);
			add_location(rect, file$49, 394, 7, 9209);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);

			if (!mounted) {
				dispose = [
					listen_dev(rect, "mousedown", /*onMousedown*/ ctx[22], false, false, false),
					listen_dev(rect, "mouseenter", /*onMouseenter*/ ctx[21](/*index*/ ctx[66]), false, false, false),
					listen_dev(rect, "mouseleave", /*onMouseleave*/ ctx[25](/*index*/ ctx[66]), false, false, false),
					listen_dev(
						rect,
						"mousemove",
						function () {
							if (is_function(/*isMousedown*/ ctx[12]
							? /*onMousemove*/ ctx[23](/*index*/ ctx[66])
							: null)) (/*isMousedown*/ ctx[12]
							? /*onMousemove*/ ctx[23](/*index*/ ctx[66])
							: null).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(rect, "mouseup", /*onMouseup*/ ctx[24](/*index*/ ctx[66]), false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*bars*/ 256 && rect_height_value !== (rect_height_value = /*barThickness*/ ctx[57])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*innerWidth*/ 1024) {
				attr_dev(rect, "width", /*innerWidth*/ ctx[10]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(394:6) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (360:4) {#each bars as {      barLength,      barThickness,      displayValue,      fill,      labelAnchor,      labelX,      selected,      x,      y1,     }
function create_each_block_1$1(ctx) {
	let g;
	let text_1;
	let t_value = /*displayValue*/ ctx[58] + "";
	let t;
	let text_1_x_value;
	let text_1_y_value;
	let text_1_text_anchor_value;
	let g_transform_value;
	let if_block0 = /*displayValue*/ ctx[58] && create_if_block_6(ctx);
	let if_block1 = /*flags*/ ctx[1].isInteractive && create_if_block_5(ctx);

	const block = {
		c: function create() {
			g = svg_element("g");
			if (if_block0) if_block0.c();
			text_1 = svg_element("text");
			t = text(t_value);
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { class: true, transform: true });
			var g_nodes = children(g);
			if (if_block0) if_block0.l(g_nodes);

			text_1 = claim_svg_element(g_nodes, "text", {
				class: true,
				x: true,
				y: true,
				"font-size": true,
				"text-anchor": true
			});

			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);
			if (if_block1) if_block1.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "class", "binsize svelte-1egg7b");
			attr_dev(text_1, "x", text_1_x_value = /*labelX*/ ctx[61]);
			attr_dev(text_1, "y", text_1_y_value = /*barThickness*/ ctx[57] / 2);
			attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			attr_dev(text_1, "text-anchor", text_1_text_anchor_value = /*labelAnchor*/ ctx[60]);
			add_location(text_1, file$49, 385, 6, 9004);
			attr_dev(g, "class", "bin svelte-1egg7b");
			attr_dev(g, "transform", g_transform_value = "translate(0," + /*y1*/ ctx[64] + ")");
			add_location(g, file$49, 370, 5, 8747);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			if (if_block0) if_block0.m(g, null);
			append_hydration_dev(g, text_1);
			append_hydration_dev(text_1, t);
			if (if_block1) if_block1.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (/*displayValue*/ ctx[58]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_6(ctx);
					if_block0.c();
					if_block0.m(g, text_1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*bars*/ 256 && t_value !== (t_value = /*displayValue*/ ctx[58] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*bars*/ 256 && text_1_x_value !== (text_1_x_value = /*labelX*/ ctx[61])) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*bars*/ 256 && text_1_y_value !== (text_1_y_value = /*barThickness*/ ctx[57] / 2)) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*fontSize*/ 32768) {
				attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			}

			if (dirty[0] & /*bars*/ 256 && text_1_text_anchor_value !== (text_1_text_anchor_value = /*labelAnchor*/ ctx[60])) {
				attr_dev(text_1, "text-anchor", text_1_text_anchor_value);
			}

			if (/*flags*/ ctx[1].isInteractive) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_5(ctx);
					if_block1.c();
					if_block1.m(g, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*bars*/ 256 && g_transform_value !== (g_transform_value = "translate(0," + /*y1*/ ctx[64] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(360:4) {#each bars as {      barLength,      barThickness,      displayValue,      fill,      labelAnchor,      labelX,      selected,      x,      y1,     }",
		ctx
	});

	return block;
}

// (417:5) {#if !flags.hideOrigin}
function create_if_block_4(ctx) {
	let circle;
	let circle_r_value;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { r: true, class: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "r", circle_r_value = /*geometry*/ ctx[2].originRadius);
			attr_dev(circle, "class", "svelte-1egg7b");
			add_location(circle, file$49, 417, 6, 9754);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*geometry*/ 4 && circle_r_value !== (circle_r_value = /*geometry*/ ctx[2].originRadius)) {
				attr_dev(circle, "r", circle_r_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(417:5) {#if !flags.hideOrigin}",
		ctx
	});

	return block;
}

// (421:5) {#if !flags.hideTicks}
function create_if_block_3(ctx) {
	let each_1_anchor;
	let each_value = /*ticks*/ ctx[16];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_hydration_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticksX, ticks, fontSize, ticksAnchor*/ 491520) {
				each_value = /*ticks*/ ctx[16];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(421:5) {#if !flags.hideTicks}",
		ctx
	});

	return block;
}

// (422:6) {#each ticks as {tick, y}}
function create_each_block$1(ctx) {
	let text_1;
	let t_value = /*tick*/ ctx[52] + "";
	let t;
	let text_1_y_value;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_svg_element(nodes, "text", {
				class: true,
				x: true,
				y: true,
				"font-size": true,
				"text-anchor": true
			});

			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "class", "range svelte-1egg7b");
			attr_dev(text_1, "x", /*ticksX*/ ctx[18]);
			attr_dev(text_1, "y", text_1_y_value = /*y*/ ctx[53]);
			attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			attr_dev(text_1, "text-anchor", /*ticksAnchor*/ ctx[17]);
			add_location(text_1, file$49, 422, 7, 9871);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, text_1, anchor);
			append_hydration_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticks*/ 65536 && t_value !== (t_value = /*tick*/ ctx[52] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*ticksX*/ 262144) {
				attr_dev(text_1, "x", /*ticksX*/ ctx[18]);
			}

			if (dirty[0] & /*ticks*/ 65536 && text_1_y_value !== (text_1_y_value = /*y*/ ctx[53])) {
				attr_dev(text_1, "y", text_1_y_value);
			}

			if (dirty[0] & /*fontSize*/ 32768) {
				attr_dev(text_1, "font-size", /*fontSize*/ ctx[15]);
			}

			if (dirty[0] & /*ticksAnchor*/ 131072) {
				attr_dev(text_1, "text-anchor", /*ticksAnchor*/ ctx[17]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(422:6) {#each ticks as {tick, y}}",
		ctx
	});

	return block;
}

// (434:4) {#if isBrushing}
function create_if_block_2$1(ctx) {
	let g;
	let line;
	let line_y__value;
	let line_y__value_1;
	let g_transform_value;

	const block = {
		c: function create() {
			g = svg_element("g");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { class: true, transform: true });
			var g_nodes = children(g);
			line = claim_svg_element(g_nodes, "line", { y1: true, y2: true, class: true });
			children(line).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "y1", line_y__value = /*brushLine*/ ctx[14].y1);
			attr_dev(line, "y2", line_y__value_1 = /*brushLine*/ ctx[14].y2);
			attr_dev(line, "class", "svelte-1egg7b");
			add_location(line, file$49, 438, 6, 10152);
			attr_dev(g, "class", "brush svelte-1egg7b");
			attr_dev(g, "transform", g_transform_value = "translate(" + /*origin*/ ctx[19].x + ",0)");
			add_location(g, file$49, 434, 5, 10076);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			append_hydration_dev(g, line);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*brushLine*/ 16384 && line_y__value !== (line_y__value = /*brushLine*/ ctx[14].y1)) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*brushLine*/ 16384 && line_y__value_1 !== (line_y__value_1 = /*brushLine*/ ctx[14].y2)) {
				attr_dev(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*origin*/ 524288 && g_transform_value !== (g_transform_value = "translate(" + /*origin*/ ctx[19].x + ",0)")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(434:4) {#if isBrushing}",
		ctx
	});

	return block;
}

function create_fragment$4a(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[5] && /*width*/ ctx[6] && create_if_block$3(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*height*/ ctx[5] && /*width*/ ctx[6]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$49($$self, $$props, $$invalidate) {
	let safety;
	let innerWidth;
	let innerHeight;
	let origin;
	let direction;
	let ticksX;
	let ticksAnchor;
	let ticks;
	let useValue;
	let getBinsMax;
	let valuesMax;
	let scales;
	let bars;
	let maxBarThickness;
	let fontSize;
	let isBrushing;
	let isPressed;
	let doesBrushAdd;
	let doesBrushRemove;
	let brushStroke;
	let brushExtent;
	let brushRange;
	let brushExtentBarYs;
	let brushLine;
	let style;
	let $_brush;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('HistogramG', slots, []);
	const dispatch = createEventDispatcher();
	const makeMaxBarThickness = arrayMaxWith(getKey$2('barThickness'));

	const defaultFlags = {
		hideOrigin: false,
		hideTicks: false,
		isInteractive: false,
		isRightToLeft: false,
		isTopDown: false,
		useLogScale: false,
		withBackground: false
	};

	const defaultGeometry = {
		// exposed but undocumented on the site
		brushThreshold: 10, // pixels to trigger brushing
		fontSizeFactor: 0.6,
		maxFontSize: 12,
		textPadding: 5,
		// documented on the site
		originRadius: 2,
		safetyXNoTicks: 20,
		safetyXTicks: 50,
		safetyXValues: 25,
		safetyY: 20
	};

	const defaultTheme = {
		// exposed but undocumented
		backgroundOpacity: 1,
		// exposed and documented but no example
		brushAddStroke: 'rgb(107,248,134)',
		brushRemoveStroke: 'rgb(246,97,20)',
		brushStrokeOpacity: 0.8,
		brushStrokeWidth: 8,
		// exposed but undocumented on the site
		axisStrokeWidth: 1,
		backgroundColor: 'white',
		binFill: 'white',
		binStroke: 'black',
		binStrokeWidth: 1,
		originColor: 'black',
		messageColor: 'black',
		messageFontSize: '1rem',
		selectedBinFill: 'rgb(255, 174, 0)',
		selectedBinStroke: 'black',
		selectedBinStrokeWidth: 2,
		textColor: 'black'
	};

	let { height = null } = $$props;
	let { width = null } = $$props;
	let { bins = [] } = $$props;
	let { binsFill = null } = $$props;
	let { flags = null } = $$props;
	let { geometry = null } = $$props;
	let { message = 'No data' } = $$props;
	let { selectedBins = [] } = $$props;
	let { theme = null } = $$props;
	let { ticksFormatFn = null } = $$props;
	let rangesExtent = [];

	/* brushing */
	let isMousedown = false;

	const brushOff = {
		delta: 0,
		end: null,
		origin: { x: null, y: null },
		start: null,
		modifier: null,
		state: 'Off'
	};

	const _brush = writable(brushOff);
	validate_store(_brush, '_brush');
	component_subscribe($$self, _brush, value => $$invalidate(42, $_brush = value));

	/* events */
	const getModifier = event => event.shiftKey ? 'shift' : event.altKey ? 'alt' : null;

	const onMouseenter = index => () => {
		if (isBrushing) {
			_brush.update(mergeObj({ end: index }));
		}

		dispatch('entered', index);
	};

	const onMousedown = event => {
		$$invalidate(12, isMousedown = true);

		_brush.set({
			delta: 0,
			modifier: getModifier(event),
			origin: { x: event.offsetX, y: event.offsetY },
			state: 'Pressed'
		});
	};

	const onMousemove = index => event => {
		if (isPressed) {
			const delta = vectorLength2D(event.offsetX - $_brush.origin.x, event.offsetY - $_brush.origin.y);

			if (delta > geometry.brushThreshold) {
				_brush.update(mergeObj({
					end: index,
					start: index,
					state: 'Brushing'
				}));

				dispatch('brushstart', index);
			} else {
				_brush.update(mergeObj({ delta }));
			}
		}
	};

	const onMouseup = index => () => {
		$$invalidate(12, isMousedown = false);

		if (isPressed) {
			if ($_brush.delta < geometry.brushThreshold) {
				if (doesBrushAdd) {
					$$invalidate(4, selectedBins = uniques(appendTo(selectedBins, index)));
				} else if (doesBrushRemove) {
					$$invalidate(4, selectedBins = pullFrom(selectedBins, [index]));
				} else {
					$$invalidate(4, selectedBins = [index]);
				}

				dispatch('clicked', { index, selectedBins });
			}
		} else if (isBrushing) {
			dispatch('brushend', index);
		}

		_brush.set(brushOff);
	};

	const onMouseleave = index => () => {
		dispatch('exited', index);
	};

	const resetSelection = () => {
		$$invalidate(4, selectedBins = []);
		dispatch('clicked', { selectedBins });
	};

	const writable_props = [
		'height',
		'width',
		'bins',
		'binsFill',
		'flags',
		'geometry',
		'message',
		'selectedBins',
		'theme',
		'ticksFormatFn'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HistogramG> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('height' in $$props) $$invalidate(5, height = $$props.height);
		if ('width' in $$props) $$invalidate(6, width = $$props.width);
		if ('bins' in $$props) $$invalidate(0, bins = $$props.bins);
		if ('binsFill' in $$props) $$invalidate(29, binsFill = $$props.binsFill);
		if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
		if ('geometry' in $$props) $$invalidate(2, geometry = $$props.geometry);
		if ('message' in $$props) $$invalidate(3, message = $$props.message);
		if ('selectedBins' in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
		if ('theme' in $$props) $$invalidate(27, theme = $$props.theme);
		if ('ticksFormatFn' in $$props) $$invalidate(28, ticksFormatFn = $$props.ticksFormatFn);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		writable,
		makeStyleVars,
		vectorLength2D,
		arrayMaxWith,
		concat,
		getValue: getValue$2,
		inclusiveRange,
		mergeObj,
		scaleLinear: linear,
		scaleLog: log,
		appendTo,
		getKey: getKey$2,
		has,
		last,
		pullFrom,
		sort,
		uniques,
		getBinsTicks,
		getValuesLength,
		dispatch,
		makeMaxBarThickness,
		defaultFlags,
		defaultGeometry,
		defaultTheme,
		height,
		width,
		bins,
		binsFill,
		flags,
		geometry,
		message,
		selectedBins,
		theme,
		ticksFormatFn,
		rangesExtent,
		isMousedown,
		brushOff,
		_brush,
		getModifier,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetSelection,
		isBrushing,
		doesBrushRemove,
		doesBrushAdd,
		isPressed,
		brushStroke,
		style,
		brushRange,
		brushExtentBarYs,
		brushLine,
		brushExtent,
		bars,
		maxBarThickness,
		fontSize,
		scales,
		innerHeight,
		innerWidth,
		valuesMax,
		getBinsMax,
		useValue,
		ticks,
		ticksAnchor,
		ticksX,
		direction,
		origin,
		safety,
		$_brush
	});

	$$self.$inject_state = $$props => {
		if ('height' in $$props) $$invalidate(5, height = $$props.height);
		if ('width' in $$props) $$invalidate(6, width = $$props.width);
		if ('bins' in $$props) $$invalidate(0, bins = $$props.bins);
		if ('binsFill' in $$props) $$invalidate(29, binsFill = $$props.binsFill);
		if ('flags' in $$props) $$invalidate(1, flags = $$props.flags);
		if ('geometry' in $$props) $$invalidate(2, geometry = $$props.geometry);
		if ('message' in $$props) $$invalidate(3, message = $$props.message);
		if ('selectedBins' in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
		if ('theme' in $$props) $$invalidate(27, theme = $$props.theme);
		if ('ticksFormatFn' in $$props) $$invalidate(28, ticksFormatFn = $$props.ticksFormatFn);
		if ('rangesExtent' in $$props) $$invalidate(30, rangesExtent = $$props.rangesExtent);
		if ('isMousedown' in $$props) $$invalidate(12, isMousedown = $$props.isMousedown);
		if ('isBrushing' in $$props) $$invalidate(7, isBrushing = $$props.isBrushing);
		if ('doesBrushRemove' in $$props) $$invalidate(31, doesBrushRemove = $$props.doesBrushRemove);
		if ('doesBrushAdd' in $$props) $$invalidate(32, doesBrushAdd = $$props.doesBrushAdd);
		if ('isPressed' in $$props) isPressed = $$props.isPressed;
		if ('brushStroke' in $$props) $$invalidate(33, brushStroke = $$props.brushStroke);
		if ('style' in $$props) $$invalidate(13, style = $$props.style);
		if ('brushRange' in $$props) $$invalidate(34, brushRange = $$props.brushRange);
		if ('brushExtentBarYs' in $$props) $$invalidate(35, brushExtentBarYs = $$props.brushExtentBarYs);
		if ('brushLine' in $$props) $$invalidate(14, brushLine = $$props.brushLine);
		if ('brushExtent' in $$props) $$invalidate(36, brushExtent = $$props.brushExtent);
		if ('bars' in $$props) $$invalidate(8, bars = $$props.bars);
		if ('maxBarThickness' in $$props) $$invalidate(37, maxBarThickness = $$props.maxBarThickness);
		if ('fontSize' in $$props) $$invalidate(15, fontSize = $$props.fontSize);
		if ('scales' in $$props) $$invalidate(38, scales = $$props.scales);
		if ('innerHeight' in $$props) $$invalidate(9, innerHeight = $$props.innerHeight);
		if ('innerWidth' in $$props) $$invalidate(10, innerWidth = $$props.innerWidth);
		if ('valuesMax' in $$props) $$invalidate(39, valuesMax = $$props.valuesMax);
		if ('getBinsMax' in $$props) $$invalidate(40, getBinsMax = $$props.getBinsMax);
		if ('useValue' in $$props) $$invalidate(41, useValue = $$props.useValue);
		if ('ticks' in $$props) $$invalidate(16, ticks = $$props.ticks);
		if ('ticksAnchor' in $$props) $$invalidate(17, ticksAnchor = $$props.ticksAnchor);
		if ('ticksX' in $$props) $$invalidate(18, ticksX = $$props.ticksX);
		if ('direction' in $$props) direction = $$props.direction;
		if ('origin' in $$props) $$invalidate(19, origin = $$props.origin);
		if ('safety' in $$props) $$invalidate(11, safety = $$props.safety);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*bins*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, bins = bins || []);
		}

		if ($$self.$$.dirty[0] & /*flags*/ 2) {
			$$invalidate(1, flags = flags ? { ...defaultFlags, ...flags } : defaultFlags);
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 4) {
			$$invalidate(2, geometry = geometry
			? { ...defaultGeometry, ...geometry }
			: defaultGeometry);
		}

		if ($$self.$$.dirty[0] & /*message*/ 8) {
			$$invalidate(3, message = message || 'No data');
		}

		if ($$self.$$.dirty[0] & /*selectedBins*/ 16) {
			$$invalidate(4, selectedBins = selectedBins || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 134217728) {
			$$invalidate(27, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*ticksFormatFn*/ 268435456) {
			$$invalidate(28, ticksFormatFn = ticksFormatFn || (x => x));
		}

		if ($$self.$$.dirty[0] & /*geometry, flags*/ 6) {
			$$invalidate(11, safety = {
				top: geometry.safetyY,
				right: flags.isRightToLeft
				? flags.hideTicks
					? geometry.safetyXNoTicks
					: geometry.safetyXTicks
				: geometry.safetyXValues,
				bottom: geometry.safetyY,
				left: flags.isRightToLeft
				? geometry.safetyXValues
				: flags.hideTicks
					? geometry.safetyXNoTicks
					: geometry.safetyXTicks
			});
		}

		if ($$self.$$.dirty[0] & /*width, safety*/ 2112) {
			$$invalidate(10, innerWidth = Math.max(0, width - safety.left - safety.right));
		}

		if ($$self.$$.dirty[0] & /*height, safety, geometry*/ 2084) {
			$$invalidate(9, innerHeight = Math.max(0, height - safety.top - safety.bottom - geometry.maxFontSize));
		}

		if ($$self.$$.dirty[0] & /*flags, innerWidth, innerHeight*/ 1538) {
			$$invalidate(19, origin = {
				x: flags.isRightToLeft ? innerWidth : 0,
				y: flags.isTopDown ? 0 : innerHeight
			});
		}

		if ($$self.$$.dirty[0] & /*flags*/ 2) {
			direction = {
				x: flags.isRightToLeft ? -1 : 1,
				y: flags.isTopDown ? 1 : -1
			};
		}

		if ($$self.$$.dirty[0] & /*flags, geometry*/ 6) {
			$$invalidate(18, ticksX = flags.isRightToLeft
			? geometry.originRadius + geometry.textPadding
			: -(geometry.originRadius + geometry.textPadding));
		}

		if ($$self.$$.dirty[0] & /*flags*/ 2) {
			$$invalidate(17, ticksAnchor = flags.isRightToLeft ? 'start' : 'end');
		}

		if ($$self.$$.dirty[0] & /*bins*/ 1) {
			$$invalidate(41, useValue = bins.length && has(bins[0], 'value'));
		}

		if ($$self.$$.dirty[1] & /*useValue*/ 1024) {
			$$invalidate(40, getBinsMax = useValue
			? arrayMaxWith(getValue$2)
			: arrayMaxWith(getValuesLength));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 1 | $$self.$$.dirty[1] & /*getBinsMax*/ 512) {
			$$invalidate(39, valuesMax = getBinsMax(bins));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 1) {
			$$invalidate(30, rangesExtent = bins.length
			? [bins[0].range[0], last(bins).range[1]]
			: []);
		}

		if ($$self.$$.dirty[0] & /*bins, flags, innerWidth, rangesExtent, innerHeight*/ 1073743363 | $$self.$$.dirty[1] & /*valuesMax*/ 256) {
			/* eslint-disable indent */
			$$invalidate(38, scales = bins.length && {
				x: flags.useLogScale
				? log().domain([1, valuesMax]).range([innerWidth / Math.log10(valuesMax), innerWidth])
				: linear().domain([0, valuesMax]).range([0, innerWidth]),
				y: linear().domain(rangesExtent).range([0, innerHeight])
			});
		}

		if ($$self.$$.dirty[0] & /*bins, ticksFormatFn, flags*/ 268435459 | $$self.$$.dirty[1] & /*scales*/ 128) {
			$$invalidate(16, ticks = getBinsTicks(bins).map(tick => ({
				tick: ticksFormatFn(tick),
				y: flags.isTopDown ? scales.y(tick) : -scales.y(tick)
			})));
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 2048) {
			$$invalidate(7, isBrushing = $_brush.state === 'Brushing');
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 2048) {
			$$invalidate(32, doesBrushAdd = $_brush.modifier === 'shift');
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 128 | $$self.$$.dirty[1] & /*$_brush*/ 2048) {
			$$invalidate(36, brushExtent = isBrushing && sort([$_brush.start, $_brush.end]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 128 | $$self.$$.dirty[1] & /*brushExtent*/ 32) {
			$$invalidate(34, brushRange = isBrushing && inclusiveRange(brushExtent));
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 2048) {
			$$invalidate(31, doesBrushRemove = $_brush.modifier === 'alt');
		}

		if ($$self.$$.dirty[0] & /*isBrushing, selectedBins*/ 144 | $$self.$$.dirty[1] & /*doesBrushAdd, brushRange, doesBrushRemove, $_brush*/ 2059) {
			if (isBrushing) {
				$$invalidate(4, selectedBins = doesBrushAdd
				? uniques(concat(selectedBins, brushRange))
				: doesBrushRemove
					? pullFrom(selectedBins, brushRange)
					: brushRange);

				dispatch('brushed', {
					end: $_brush.end,
					selectedBins,
					start: $_brush.start
				});
			}
		}

		if ($$self.$$.dirty[0] & /*bins, selectedBins, flags, innerWidth, innerHeight, geometry, binsFill, theme*/ 671090199 | $$self.$$.dirty[1] & /*scales*/ 128) {
			/* eslint-enable indent */
			$$invalidate(8, bars = bins.map((bin, index) => {
				const { range, values, value } = bin;
				const selected = selectedBins.length && selectedBins.includes(index);
				const displayValue = values ? values.length : value;
				const barLength = scales.x(displayValue);
				const barThickness = scales.y(range[1]) - scales.y(range[0]);
				const x = flags.isRightToLeft ? innerWidth - barLength : 0;

				const y1 = flags.isTopDown
				? scales.y(range[0])
				: innerHeight - scales.y(range[0]) - barThickness;

				const y2 = y1 + barThickness;

				const labelX = flags.isRightToLeft
				? x - geometry.textPadding
				: barLength + geometry.textPadding;

				const labelAnchor = flags.isRightToLeft ? 'end' : 'start';

				const fill = bin.color || (binsFill && binsFill[index]
				? binsFill[index]
				: theme.binFill);

				return {
					...bin,
					...{
						barLength,
						barThickness,
						displayValue,
						fill,
						labelAnchor,
						labelX,
						selected,
						x,
						y1,
						y2
					}
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*bars*/ 256) {
			$$invalidate(37, maxBarThickness = makeMaxBarThickness(bars));
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 4 | $$self.$$.dirty[1] & /*maxBarThickness*/ 64) {
			$$invalidate(15, fontSize = Math.min(geometry.maxFontSize, geometry.fontSizeFactor * maxBarThickness));
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 2048) {
			isPressed = $_brush.state === 'Pressed';
		}

		if ($$self.$$.dirty[0] & /*theme*/ 134217728 | $$self.$$.dirty[1] & /*doesBrushAdd, doesBrushRemove*/ 3) {
			$$invalidate(33, brushStroke = doesBrushAdd
			? theme.brushAddStroke
			: doesBrushRemove ? theme.brushRemoveStroke : null);
		}

		if ($$self.$$.dirty[0] & /*isBrushing, bars*/ 384 | $$self.$$.dirty[1] & /*brushExtent*/ 32) {
			$$invalidate(35, brushExtentBarYs = isBrushing && sort([
				bars[brushExtent[0]].y1,
				bars[brushExtent[0]].y2,
				bars[brushExtent[1]].y1,
				bars[brushExtent[1]].y2
			]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 128 | $$self.$$.dirty[1] & /*brushExtentBarYs*/ 16) {
			$$invalidate(14, brushLine = isBrushing && {
				y1: brushExtentBarYs[0],
				y2: brushExtentBarYs[3]
			});
		}

		if ($$self.$$.dirty[0] & /*theme*/ 134217728 | $$self.$$.dirty[1] & /*brushStroke*/ 4) {
			/* style */
			$$invalidate(13, style = makeStyleVars({ ...theme, brushStroke }));
		}
	};

	return [
		bins,
		flags,
		geometry,
		message,
		selectedBins,
		height,
		width,
		isBrushing,
		bars,
		innerHeight,
		innerWidth,
		safety,
		isMousedown,
		style,
		brushLine,
		fontSize,
		ticks,
		ticksAnchor,
		ticksX,
		origin,
		_brush,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetSelection,
		theme,
		ticksFormatFn,
		binsFill,
		rangesExtent,
		doesBrushRemove,
		doesBrushAdd,
		brushStroke,
		brushRange,
		brushExtentBarYs,
		brushExtent,
		maxBarThickness,
		scales,
		valuesMax,
		getBinsMax,
		useValue,
		$_brush
	];
}

class HistogramG extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$49,
			create_fragment$4a,
			safe_not_equal,
			{
				height: 5,
				width: 6,
				bins: 0,
				binsFill: 29,
				flags: 1,
				geometry: 2,
				message: 3,
				selectedBins: 4,
				theme: 27,
				ticksFormatFn: 28
			},
			null,
			[-1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HistogramG",
			options,
			id: create_fragment$4a.name
		});
	}

	get height() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bins() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get binsFill() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set binsFill(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get message() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set message(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<HistogramG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<HistogramG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var HistogramG$1 = HistogramG;

/* ../../components/histogram/src/HistogramDiv.svelte generated by Svelte v3.44.2 */
const file$48 = "../../components/histogram/src/HistogramDiv.svelte";

// (34:1) {#if title}
function create_if_block_1$1(ctx) {
	let header;
	let h2;
	let t;

	const block = {
		c: function create() {
			header = element("header");
			h2 = element("h2");
			t = text(/*title*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			h2 = claim_element(header_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[0]);
			h2_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-4i00u3");
			add_location(h2, file$48, 35, 3, 756);
			attr_dev(header, "class", "svelte-4i00u3");
			toggle_class(header, "rightToLeft", /*flags*/ ctx[3] && /*flags*/ ctx[3].isRightToLeft);
			add_location(header, file$48, 34, 2, 695);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, header, anchor);
			append_hydration_dev(header, h2);
			append_hydration_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);

			if (dirty & /*flags*/ 8) {
				toggle_class(header, "rightToLeft", /*flags*/ ctx[3] && /*flags*/ ctx[3].isRightToLeft);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(34:1) {#if title}",
		ctx
	});

	return block;
}

// (48:3) {#if bins}
function create_if_block$2(ctx) {
	let histogramg;
	let current;

	histogramg = new HistogramG$1({
			props: {
				bins: /*bins*/ ctx[1],
				binsFill: /*binsFill*/ ctx[2],
				flags: /*flags*/ ctx[3],
				geometry: /*geometry*/ ctx[4],
				height: /*height*/ ctx[9],
				message: /*message*/ ctx[5],
				selectedBins: /*selectedBins*/ ctx[6],
				theme: /*theme*/ ctx[7],
				ticksFormatFn: /*ticksFormatFn*/ ctx[8],
				width: /*width*/ ctx[10]
			},
			$$inline: true
		});

	histogramg.$on("brushed", /*brushed_handler*/ ctx[14]);
	histogramg.$on("brushend", /*brushend_handler*/ ctx[15]);
	histogramg.$on("brushstart", /*brushstart_handler*/ ctx[16]);
	histogramg.$on("clicked", /*clicked_handler*/ ctx[17]);
	histogramg.$on("entered", /*entered_handler*/ ctx[18]);
	histogramg.$on("exited", /*exited_handler*/ ctx[19]);

	const block = {
		c: function create() {
			create_component(histogramg.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(histogramg.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(histogramg, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const histogramg_changes = {};
			if (dirty & /*bins*/ 2) histogramg_changes.bins = /*bins*/ ctx[1];
			if (dirty & /*binsFill*/ 4) histogramg_changes.binsFill = /*binsFill*/ ctx[2];
			if (dirty & /*flags*/ 8) histogramg_changes.flags = /*flags*/ ctx[3];
			if (dirty & /*geometry*/ 16) histogramg_changes.geometry = /*geometry*/ ctx[4];
			if (dirty & /*height*/ 512) histogramg_changes.height = /*height*/ ctx[9];
			if (dirty & /*message*/ 32) histogramg_changes.message = /*message*/ ctx[5];
			if (dirty & /*selectedBins*/ 64) histogramg_changes.selectedBins = /*selectedBins*/ ctx[6];
			if (dirty & /*theme*/ 128) histogramg_changes.theme = /*theme*/ ctx[7];
			if (dirty & /*ticksFormatFn*/ 256) histogramg_changes.ticksFormatFn = /*ticksFormatFn*/ ctx[8];
			if (dirty & /*width*/ 1024) histogramg_changes.width = /*width*/ ctx[10];
			histogramg.$set(histogramg_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(histogramg.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(histogramg.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(histogramg, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(48:3) {#if bins}",
		ctx
	});

	return block;
}

function create_fragment$49(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let main_resize_listener;
	let current;
	let if_block0 = /*title*/ ctx[0] && create_if_block_1$1(ctx);
	let if_block1 = /*bins*/ ctx[1] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block0) if_block0.c();
			t = space();
			main = element("main");
			svg = svg_element("svg");
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			main = claim_element(div_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			svg = claim_svg_element(main_nodes, "svg", { width: true, height: true, class: true });
			var svg_nodes = children(svg);
			if (if_block1) if_block1.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[10]);
			attr_dev(svg, "height", /*height*/ ctx[9]);
			attr_dev(svg, "class", "svelte-4i00u3");
			add_location(svg, file$48, 43, 2, 899);
			attr_dev(main, "class", "svelte-4i00u3");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[20].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$48, 38, 1, 793);
			attr_dev(div, "class", "HistogramDiv svelte-4i00u3");
			attr_dev(div, "style", /*style*/ ctx[11]);
			toggle_class(div, "interactive", /*flags*/ ctx[3] && /*flags*/ ctx[3].isInteractive);
			add_location(div, file$48, 28, 0, 592);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_hydration_dev(div, t);
			append_hydration_dev(div, main);
			append_hydration_dev(main, svg);
			if (if_block1) if_block1.m(svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[20].bind(main));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1$1(ctx);
					if_block0.c();
					if_block0.m(div, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*bins*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*bins*/ 2) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(svg, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*width*/ 1024) {
				attr_dev(svg, "width", /*width*/ ctx[10]);
			}

			if (!current || dirty & /*height*/ 512) {
				attr_dev(svg, "height", /*height*/ ctx[9]);
			}

			if (dirty & /*title*/ 1) {
				toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			}

			if (!current || dirty & /*style*/ 2048) {
				attr_dev(div, "style", /*style*/ ctx[11]);
			}

			if (dirty & /*flags*/ 8) {
				toggle_class(div, "interactive", /*flags*/ ctx[3] && /*flags*/ ctx[3].isInteractive);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			main_resize_listener();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$49.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$48($$self, $$props, $$invalidate) {
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('HistogramDiv', slots, []);
	let { headerHeight } = $$props;
	let { padding } = $$props;
	let { title } = $$props;
	let { bins = [] } = $$props;
	let { binsFill = null } = $$props;
	let { flags = null } = $$props;
	let { geometry = null } = $$props;
	let { message = 'No data' } = $$props;
	let { selectedBins = [] } = $$props;
	let { theme = null } = $$props;
	let { ticksFormatFn = null } = $$props;
	let height = 0;
	let width = 0;

	const writable_props = [
		'headerHeight',
		'padding',
		'title',
		'bins',
		'binsFill',
		'flags',
		'geometry',
		'message',
		'selectedBins',
		'theme',
		'ticksFormatFn'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HistogramDiv> was created with unknown prop '${key}'`);
	});

	function brushed_handler(event) {
		bubble.call(this, $$self, event);
	}

	function brushend_handler(event) {
		bubble.call(this, $$self, event);
	}

	function brushstart_handler(event) {
		bubble.call(this, $$self, event);
	}

	function clicked_handler(event) {
		bubble.call(this, $$self, event);
	}

	function entered_handler(event) {
		bubble.call(this, $$self, event);
	}

	function exited_handler(event) {
		bubble.call(this, $$self, event);
	}

	function main_elementresize_handler() {
		height = this.clientHeight;
		width = this.clientWidth;
		$$invalidate(9, height);
		$$invalidate(10, width);
	}

	$$self.$$set = $$props => {
		if ('headerHeight' in $$props) $$invalidate(12, headerHeight = $$props.headerHeight);
		if ('padding' in $$props) $$invalidate(13, padding = $$props.padding);
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('bins' in $$props) $$invalidate(1, bins = $$props.bins);
		if ('binsFill' in $$props) $$invalidate(2, binsFill = $$props.binsFill);
		if ('flags' in $$props) $$invalidate(3, flags = $$props.flags);
		if ('geometry' in $$props) $$invalidate(4, geometry = $$props.geometry);
		if ('message' in $$props) $$invalidate(5, message = $$props.message);
		if ('selectedBins' in $$props) $$invalidate(6, selectedBins = $$props.selectedBins);
		if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
		if ('ticksFormatFn' in $$props) $$invalidate(8, ticksFormatFn = $$props.ticksFormatFn);
	};

	$$self.$capture_state = () => ({
		makeStyleVars,
		HistogramG: HistogramG$1,
		headerHeight,
		padding,
		title,
		bins,
		binsFill,
		flags,
		geometry,
		message,
		selectedBins,
		theme,
		ticksFormatFn,
		height,
		width,
		style
	});

	$$self.$inject_state = $$props => {
		if ('headerHeight' in $$props) $$invalidate(12, headerHeight = $$props.headerHeight);
		if ('padding' in $$props) $$invalidate(13, padding = $$props.padding);
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('bins' in $$props) $$invalidate(1, bins = $$props.bins);
		if ('binsFill' in $$props) $$invalidate(2, binsFill = $$props.binsFill);
		if ('flags' in $$props) $$invalidate(3, flags = $$props.flags);
		if ('geometry' in $$props) $$invalidate(4, geometry = $$props.geometry);
		if ('message' in $$props) $$invalidate(5, message = $$props.message);
		if ('selectedBins' in $$props) $$invalidate(6, selectedBins = $$props.selectedBins);
		if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
		if ('ticksFormatFn' in $$props) $$invalidate(8, ticksFormatFn = $$props.ticksFormatFn);
		if ('height' in $$props) $$invalidate(9, height = $$props.height);
		if ('width' in $$props) $$invalidate(10, width = $$props.width);
		if ('style' in $$props) $$invalidate(11, style = $$props.style);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*padding*/ 8192) {
			$$invalidate(13, padding = padding || '10px');
		}

		if ($$self.$$.dirty & /*headerHeight*/ 4096) {
			$$invalidate(12, headerHeight = headerHeight || '2rem');
		}

		if ($$self.$$.dirty & /*headerHeight, padding*/ 12288) {
			$$invalidate(11, style = makeStyleVars({ headerHeight, padding }));
		}
	};

	return [
		title,
		bins,
		binsFill,
		flags,
		geometry,
		message,
		selectedBins,
		theme,
		ticksFormatFn,
		height,
		width,
		style,
		headerHeight,
		padding,
		brushed_handler,
		brushend_handler,
		brushstart_handler,
		clicked_handler,
		entered_handler,
		exited_handler,
		main_elementresize_handler
	];
}

class HistogramDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$48, create_fragment$49, safe_not_equal, {
			headerHeight: 12,
			padding: 13,
			title: 0,
			bins: 1,
			binsFill: 2,
			flags: 3,
			geometry: 4,
			message: 5,
			selectedBins: 6,
			theme: 7,
			ticksFormatFn: 8
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HistogramDiv",
			options,
			id: create_fragment$49.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*headerHeight*/ ctx[12] === undefined && !('headerHeight' in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'headerHeight'");
		}

		if (/*padding*/ ctx[13] === undefined && !('padding' in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'padding'");
		}

		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
			console.warn("<HistogramDiv> was created without expected prop 'title'");
		}
	}

	get headerHeight() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set headerHeight(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get padding() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set padding(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bins() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get binsFill() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set binsFill(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get message() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set message(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<HistogramDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<HistogramDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var HistogramDiv$1 = HistogramDiv;

var histogram = /*#__PURE__*/Object.freeze({
  __proto__: null,
  HistogramG: HistogramG$1,
  HistogramDiv: HistogramDiv$1,
  exactAmountBins: exactAmountBins,
  areValidBins: areValidBins,
  getBinsItems: getBinsItems,
  getValuesLength: getValuesLength,
  getBinsMax: getBinsMax,
  getBinsMin: getBinsMin,
  getBinsExtent: getBinsExtent,
  isNonEmptyBin: isNonEmptyBin,
  findFirstNonEmptyBinIndex: findFirstNonEmptyBinIndex,
  findLastNonEmptyBinIndex: findLastNonEmptyBinIndex,
  getTrimmedBinsStats: getTrimmedBinsStats,
  getBinsTicks: getBinsTicks,
  getBinsTicksExtent: getBinsTicksExtent,
  getNonEmptyBinsTicks: getNonEmptyBinsTicks
});

var legend = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ColorBinsG: ColorBinsG,
  ColorBinsDiv: ColorBinsDiv
});

/* ../../components/ui/src/icons/feather/Airplay.svelte generated by Svelte v3.44.2 */

const file$47 = "../../components/ui/src/icons/feather/Airplay.svelte";

function create_fragment$48(ctx) {
	let path;
	let polygon;

	const block = {
		c: function create() {
			path = svg_element("path");
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1");
			add_location(path, file$47, 1, 0, 34);
			attr_dev(polygon, "points", "12 15 17 21 7 21 12 15");
			add_location(polygon, file$47, 1, 92, 126);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$48.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$47($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Airplay', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Airplay> was created with unknown prop '${key}'`);
	});

	return [];
}

class Airplay extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$47, create_fragment$48, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Airplay",
			options,
			id: create_fragment$48.name
		});
	}
}

var Airplay$1 = Airplay;

/* ../../components/ui/src/icons/feather/AlertCircle.svelte generated by Svelte v3.44.2 */

const file$46 = "../../components/ui/src/icons/feather/AlertCircle.svelte";

function create_fragment$47(ctx) {
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$46, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$46, 1, 40, 74);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "16");
			attr_dev(line1, "x2", "12.01");
			attr_dev(line1, "y2", "16");
			add_location(line1, file$46, 1, 84, 118);
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
		block,
		id: create_fragment$47.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$46($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AlertCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AlertCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class AlertCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$46, create_fragment$47, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AlertCircle",
			options,
			id: create_fragment$47.name
		});
	}
}

var AlertCircle$1 = AlertCircle;

/* ../../components/ui/src/icons/feather/AlertOctagon.svelte generated by Svelte v3.44.2 */

const file$45 = "../../components/ui/src/icons/feather/AlertOctagon.svelte";

function create_fragment$46(ctx) {
	let polygon;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2");
			add_location(polygon, file$45, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$45, 1, 99, 133);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "16");
			attr_dev(line1, "x2", "12.01");
			attr_dev(line1, "y2", "16");
			add_location(line1, file$45, 1, 143, 177);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$46.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$45($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AlertOctagon', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AlertOctagon> was created with unknown prop '${key}'`);
	});

	return [];
}

class AlertOctagon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$45, create_fragment$46, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AlertOctagon",
			options,
			id: create_fragment$46.name
		});
	}
}

var AlertOctagon$1 = AlertOctagon;

/* ../../components/ui/src/icons/feather/AlignCenter.svelte generated by Svelte v3.44.2 */

const file$44 = "../../components/ui/src/icons/feather/AlignCenter.svelte";

function create_fragment$45(ctx) {
	let line0;
	let line1;
	let line2;
	let line3;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "18");
			attr_dev(line0, "y1", "10");
			attr_dev(line0, "x2", "6");
			attr_dev(line0, "y2", "10");
			add_location(line0, file$44, 1, 0, 34);
			attr_dev(line1, "x1", "21");
			attr_dev(line1, "y1", "6");
			attr_dev(line1, "x2", "3");
			attr_dev(line1, "y2", "6");
			add_location(line1, file$44, 1, 44, 78);
			attr_dev(line2, "x1", "21");
			attr_dev(line2, "y1", "14");
			attr_dev(line2, "x2", "3");
			attr_dev(line2, "y2", "14");
			add_location(line2, file$44, 1, 86, 120);
			attr_dev(line3, "x1", "18");
			attr_dev(line3, "y1", "18");
			attr_dev(line3, "x2", "6");
			attr_dev(line3, "y2", "18");
			add_location(line3, file$44, 1, 130, 164);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$45.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$44($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AlignCenter', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AlignCenter> was created with unknown prop '${key}'`);
	});

	return [];
}

class AlignCenter extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$44, create_fragment$45, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AlignCenter",
			options,
			id: create_fragment$45.name
		});
	}
}

var AlignCenter$1 = AlignCenter;

/* ../../components/ui/src/icons/feather/AlignJustify.svelte generated by Svelte v3.44.2 */

const file$43 = "../../components/ui/src/icons/feather/AlignJustify.svelte";

function create_fragment$44(ctx) {
	let line0;
	let line1;
	let line2;
	let line3;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "21");
			attr_dev(line0, "y1", "10");
			attr_dev(line0, "x2", "3");
			attr_dev(line0, "y2", "10");
			add_location(line0, file$43, 1, 0, 34);
			attr_dev(line1, "x1", "21");
			attr_dev(line1, "y1", "6");
			attr_dev(line1, "x2", "3");
			attr_dev(line1, "y2", "6");
			add_location(line1, file$43, 1, 44, 78);
			attr_dev(line2, "x1", "21");
			attr_dev(line2, "y1", "14");
			attr_dev(line2, "x2", "3");
			attr_dev(line2, "y2", "14");
			add_location(line2, file$43, 1, 86, 120);
			attr_dev(line3, "x1", "21");
			attr_dev(line3, "y1", "18");
			attr_dev(line3, "x2", "3");
			attr_dev(line3, "y2", "18");
			add_location(line3, file$43, 1, 130, 164);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$44.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$43($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AlignJustify', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AlignJustify> was created with unknown prop '${key}'`);
	});

	return [];
}

class AlignJustify extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$43, create_fragment$44, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AlignJustify",
			options,
			id: create_fragment$44.name
		});
	}
}

var AlignJustify$1 = AlignJustify;

/* ../../components/ui/src/icons/feather/AlignLeft.svelte generated by Svelte v3.44.2 */

const file$42 = "../../components/ui/src/icons/feather/AlignLeft.svelte";

function create_fragment$43(ctx) {
	let line0;
	let line1;
	let line2;
	let line3;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "17");
			attr_dev(line0, "y1", "10");
			attr_dev(line0, "x2", "3");
			attr_dev(line0, "y2", "10");
			add_location(line0, file$42, 1, 0, 34);
			attr_dev(line1, "x1", "21");
			attr_dev(line1, "y1", "6");
			attr_dev(line1, "x2", "3");
			attr_dev(line1, "y2", "6");
			add_location(line1, file$42, 1, 44, 78);
			attr_dev(line2, "x1", "21");
			attr_dev(line2, "y1", "14");
			attr_dev(line2, "x2", "3");
			attr_dev(line2, "y2", "14");
			add_location(line2, file$42, 1, 86, 120);
			attr_dev(line3, "x1", "17");
			attr_dev(line3, "y1", "18");
			attr_dev(line3, "x2", "3");
			attr_dev(line3, "y2", "18");
			add_location(line3, file$42, 1, 130, 164);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$43.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$42($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AlignLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AlignLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class AlignLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$42, create_fragment$43, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AlignLeft",
			options,
			id: create_fragment$43.name
		});
	}
}

var AlignLeft$1 = AlignLeft;

/* ../../components/ui/src/icons/feather/AlignRight.svelte generated by Svelte v3.44.2 */

const file$41 = "../../components/ui/src/icons/feather/AlignRight.svelte";

function create_fragment$42(ctx) {
	let line0;
	let line1;
	let line2;
	let line3;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "21");
			attr_dev(line0, "y1", "10");
			attr_dev(line0, "x2", "7");
			attr_dev(line0, "y2", "10");
			add_location(line0, file$41, 1, 0, 34);
			attr_dev(line1, "x1", "21");
			attr_dev(line1, "y1", "6");
			attr_dev(line1, "x2", "3");
			attr_dev(line1, "y2", "6");
			add_location(line1, file$41, 1, 44, 78);
			attr_dev(line2, "x1", "21");
			attr_dev(line2, "y1", "14");
			attr_dev(line2, "x2", "3");
			attr_dev(line2, "y2", "14");
			add_location(line2, file$41, 1, 86, 120);
			attr_dev(line3, "x1", "21");
			attr_dev(line3, "y1", "18");
			attr_dev(line3, "x2", "7");
			attr_dev(line3, "y2", "18");
			add_location(line3, file$41, 1, 130, 164);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$42.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$41($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AlignRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AlignRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class AlignRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$41, create_fragment$42, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AlignRight",
			options,
			id: create_fragment$42.name
		});
	}
}

var AlignRight$1 = AlignRight;

/* ../../components/ui/src/icons/feather/Anchor.svelte generated by Svelte v3.44.2 */

const file$40 = "../../components/ui/src/icons/feather/Anchor.svelte";

function create_fragment$41(ctx) {
	let circle;
	let line;
	let path;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "5");
			attr_dev(circle, "r", "3");
			add_location(circle, file$40, 1, 0, 34);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "22");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "8");
			add_location(line, file$40, 1, 38, 72);
			attr_dev(path, "d", "M5 12H2a10 10 0 0 0 20 0h-3");
			add_location(path, file$40, 1, 82, 116);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$41.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$40($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Anchor', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Anchor> was created with unknown prop '${key}'`);
	});

	return [];
}

class Anchor extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$40, create_fragment$41, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Anchor",
			options,
			id: create_fragment$41.name
		});
	}
}

var Anchor$1 = Anchor;

/* ../../components/ui/src/icons/feather/Aperture.svelte generated by Svelte v3.44.2 */

const file$3$ = "../../components/ui/src/icons/feather/Aperture.svelte";

function create_fragment$40(ctx) {
	let circle;
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$3$, 1, 0, 34);
			attr_dev(line0, "x1", "14.31");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "20.05");
			attr_dev(line0, "y2", "17.94");
			add_location(line0, file$3$, 1, 40, 74);
			attr_dev(line1, "x1", "9.69");
			attr_dev(line1, "y1", "8");
			attr_dev(line1, "x2", "21.17");
			attr_dev(line1, "y2", "8");
			add_location(line1, file$3$, 1, 93, 127);
			attr_dev(line2, "x1", "7.38");
			attr_dev(line2, "y1", "12");
			attr_dev(line2, "x2", "13.12");
			attr_dev(line2, "y2", "2.06");
			add_location(line2, file$3$, 1, 141, 175);
			attr_dev(line3, "x1", "9.69");
			attr_dev(line3, "y1", "16");
			attr_dev(line3, "x2", "3.95");
			attr_dev(line3, "y2", "6.06");
			add_location(line3, file$3$, 1, 193, 227);
			attr_dev(line4, "x1", "14.31");
			attr_dev(line4, "y1", "16");
			attr_dev(line4, "x2", "2.83");
			attr_dev(line4, "y2", "16");
			add_location(line4, file$3$, 1, 244, 278);
			attr_dev(line5, "x1", "16.62");
			attr_dev(line5, "y1", "12");
			attr_dev(line5, "x2", "10.88");
			attr_dev(line5, "y2", "21.94");
			add_location(line5, file$3$, 1, 294, 328);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$40.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3$($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Aperture', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Aperture> was created with unknown prop '${key}'`);
	});

	return [];
}

class Aperture extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3$, create_fragment$40, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Aperture",
			options,
			id: create_fragment$40.name
		});
	}
}

var Aperture$1 = Aperture;

/* ../../components/ui/src/icons/feather/Archive.svelte generated by Svelte v3.44.2 */

const file$3_ = "../../components/ui/src/icons/feather/Archive.svelte";

function create_fragment$3$(ctx) {
	let polyline;
	let rect;
	let line;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			rect = svg_element("rect");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);

			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "21 8 21 21 3 21 3 8");
			add_location(polyline, file$3_, 1, 0, 34);
			attr_dev(rect, "x", "1");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "22");
			attr_dev(rect, "height", "5");
			add_location(rect, file$3_, 1, 50, 84);
			attr_dev(line, "x1", "10");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "14");
			attr_dev(line, "y2", "12");
			add_location(line, file$3_, 1, 97, 131);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3$.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3_($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Archive', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Archive> was created with unknown prop '${key}'`);
	});

	return [];
}

class Archive extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3_, create_fragment$3$, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Archive",
			options,
			id: create_fragment$3$.name
		});
	}
}

var Archive$1 = Archive;

/* ../../components/ui/src/icons/feather/ArrowDownCircle.svelte generated by Svelte v3.44.2 */

const file$3Z = "../../components/ui/src/icons/feather/ArrowDownCircle.svelte";

function create_fragment$3_(ctx) {
	let circle;
	let polyline;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$3Z, 1, 0, 34);
			attr_dev(polyline, "points", "8 12 12 16 16 12");
			add_location(polyline, file$3Z, 1, 40, 74);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "8");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "16");
			add_location(line, file$3Z, 1, 87, 121);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3_.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3Z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowDownCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowDownCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowDownCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3Z, create_fragment$3_, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowDownCircle",
			options,
			id: create_fragment$3_.name
		});
	}
}

var ArrowDownCircle$1 = ArrowDownCircle;

/* ../../components/ui/src/icons/feather/ArrowDownLeft.svelte generated by Svelte v3.44.2 */

const file$3Y = "../../components/ui/src/icons/feather/ArrowDownLeft.svelte";

function create_fragment$3Z(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "17");
			attr_dev(line, "y1", "7");
			attr_dev(line, "x2", "7");
			attr_dev(line, "y2", "17");
			add_location(line, file$3Y, 1, 0, 34);
			attr_dev(polyline, "points", "17 17 7 17 7 7");
			add_location(polyline, file$3Y, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3Z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3Y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowDownLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowDownLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowDownLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3Y, create_fragment$3Z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowDownLeft",
			options,
			id: create_fragment$3Z.name
		});
	}
}

var ArrowDownLeft$1 = ArrowDownLeft;

/* ../../components/ui/src/icons/feather/ArrowDownRight.svelte generated by Svelte v3.44.2 */

const file$3X = "../../components/ui/src/icons/feather/ArrowDownRight.svelte";

function create_fragment$3Y(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "7");
			attr_dev(line, "y1", "7");
			attr_dev(line, "x2", "17");
			attr_dev(line, "y2", "17");
			add_location(line, file$3X, 1, 0, 34);
			attr_dev(polyline, "points", "17 7 17 17 7 17");
			add_location(polyline, file$3X, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3Y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3X($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowDownRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowDownRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowDownRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3X, create_fragment$3Y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowDownRight",
			options,
			id: create_fragment$3Y.name
		});
	}
}

var ArrowDownRight$1 = ArrowDownRight;

/* ../../components/ui/src/icons/feather/ArrowDown.svelte generated by Svelte v3.44.2 */

const file$3W = "../../components/ui/src/icons/feather/ArrowDown.svelte";

function create_fragment$3X(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "5");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "19");
			add_location(line, file$3W, 1, 0, 34);
			attr_dev(polyline, "points", "19 12 12 19 5 12");
			add_location(polyline, file$3W, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3X.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3W($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowDown', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowDown> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3W, create_fragment$3X, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowDown",
			options,
			id: create_fragment$3X.name
		});
	}
}

var ArrowDown$1 = ArrowDown;

/* ../../components/ui/src/icons/feather/ArrowLeft.svelte generated by Svelte v3.44.2 */

const file$3V = "../../components/ui/src/icons/feather/ArrowLeft.svelte";

function create_fragment$3W(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "19");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "5");
			attr_dev(line, "y2", "12");
			add_location(line, file$3V, 1, 0, 34);
			attr_dev(polyline, "points", "12 19 5 12 12 5");
			add_location(polyline, file$3V, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3W.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3V($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3V, create_fragment$3W, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowLeft",
			options,
			id: create_fragment$3W.name
		});
	}
}

var ArrowLeft$1 = ArrowLeft;

/* ../../components/ui/src/icons/feather/ArrowRight.svelte generated by Svelte v3.44.2 */

const file$3U = "../../components/ui/src/icons/feather/ArrowRight.svelte";

function create_fragment$3V(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "5");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "19");
			attr_dev(line, "y2", "12");
			add_location(line, file$3U, 1, 0, 34);
			attr_dev(polyline, "points", "12 5 19 12 12 19");
			add_location(polyline, file$3U, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3V.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3U($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3U, create_fragment$3V, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowRight",
			options,
			id: create_fragment$3V.name
		});
	}
}

var ArrowRight$1 = ArrowRight;

/* ../../components/ui/src/icons/feather/ArrowUpCircle.svelte generated by Svelte v3.44.2 */

const file$3T = "../../components/ui/src/icons/feather/ArrowUpCircle.svelte";

function create_fragment$3U(ctx) {
	let circle;
	let polyline;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$3T, 1, 0, 34);
			attr_dev(polyline, "points", "16 12 12 8 8 12");
			add_location(polyline, file$3T, 1, 40, 74);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "16");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "8");
			add_location(line, file$3T, 1, 86, 120);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3U.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3T($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowUpCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowUpCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowUpCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3T, create_fragment$3U, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowUpCircle",
			options,
			id: create_fragment$3U.name
		});
	}
}

var ArrowUpCircle$1 = ArrowUpCircle;

/* ../../components/ui/src/icons/feather/ArrowUpLeft.svelte generated by Svelte v3.44.2 */

const file$3S = "../../components/ui/src/icons/feather/ArrowUpLeft.svelte";

function create_fragment$3T(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "17");
			attr_dev(line, "y1", "17");
			attr_dev(line, "x2", "7");
			attr_dev(line, "y2", "7");
			add_location(line, file$3S, 1, 0, 34);
			attr_dev(polyline, "points", "7 17 7 7 17 7");
			add_location(polyline, file$3S, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3T.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3S($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowUpLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowUpLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowUpLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3S, create_fragment$3T, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowUpLeft",
			options,
			id: create_fragment$3T.name
		});
	}
}

var ArrowUpLeft$1 = ArrowUpLeft;

/* ../../components/ui/src/icons/feather/ArrowUpRight.svelte generated by Svelte v3.44.2 */

const file$3R = "../../components/ui/src/icons/feather/ArrowUpRight.svelte";

function create_fragment$3S(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "7");
			attr_dev(line, "y1", "17");
			attr_dev(line, "x2", "17");
			attr_dev(line, "y2", "7");
			add_location(line, file$3R, 1, 0, 34);
			attr_dev(polyline, "points", "7 7 17 7 17 17");
			add_location(polyline, file$3R, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3S.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3R($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowUpRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowUpRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowUpRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3R, create_fragment$3S, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowUpRight",
			options,
			id: create_fragment$3S.name
		});
	}
}

var ArrowUpRight$1 = ArrowUpRight;

/* ../../components/ui/src/icons/feather/ArrowUp.svelte generated by Svelte v3.44.2 */

const file$3Q = "../../components/ui/src/icons/feather/ArrowUp.svelte";

function create_fragment$3R(ctx) {
	let line;
	let polyline;

	const block = {
		c: function create() {
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "19");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "5");
			add_location(line, file$3Q, 1, 0, 34);
			attr_dev(polyline, "points", "5 12 12 5 19 12");
			add_location(polyline, file$3Q, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3R.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3Q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowUp', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowUp> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowUp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3Q, create_fragment$3R, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowUp",
			options,
			id: create_fragment$3R.name
		});
	}
}

var ArrowUp$1 = ArrowUp;

/* ../../components/ui/src/icons/feather/AtSign.svelte generated by Svelte v3.44.2 */

const file$3P = "../../components/ui/src/icons/feather/AtSign.svelte";

function create_fragment$3Q(ctx) {
	let circle;
	let path;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "4");
			add_location(circle, file$3P, 1, 0, 34);
			attr_dev(path, "d", "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94");
			add_location(path, file$3P, 1, 39, 73);
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
		block,
		id: create_fragment$3Q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3P($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AtSign', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AtSign> was created with unknown prop '${key}'`);
	});

	return [];
}

class AtSign extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3P, create_fragment$3Q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AtSign",
			options,
			id: create_fragment$3Q.name
		});
	}
}

var AtSign$1 = AtSign;

/* ../../components/ui/src/icons/feather/Award.svelte generated by Svelte v3.44.2 */

const file$3O = "../../components/ui/src/icons/feather/Award.svelte";

function create_fragment$3P(ctx) {
	let circle;
	let polyline;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "8");
			attr_dev(circle, "r", "7");
			add_location(circle, file$3O, 1, 0, 34);
			attr_dev(polyline, "points", "8.21 13.89 7 23 12 20 17 23 15.79 13.88");
			add_location(polyline, file$3O, 1, 38, 72);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3P.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3O($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Award', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Award> was created with unknown prop '${key}'`);
	});

	return [];
}

class Award extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3O, create_fragment$3P, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Award",
			options,
			id: create_fragment$3P.name
		});
	}
}

var Award$1 = Award;

/* ../../components/ui/src/icons/feather/BarChart2.svelte generated by Svelte v3.44.2 */

const file$3N = "../../components/ui/src/icons/feather/BarChart2.svelte";

function create_fragment$3O(ctx) {
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "18");
			attr_dev(line0, "y1", "20");
			attr_dev(line0, "x2", "18");
			attr_dev(line0, "y2", "10");
			add_location(line0, file$3N, 1, 0, 34);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "20");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "4");
			add_location(line1, file$3N, 1, 45, 79);
			attr_dev(line2, "x1", "6");
			attr_dev(line2, "y1", "20");
			attr_dev(line2, "x2", "6");
			attr_dev(line2, "y2", "14");
			add_location(line2, file$3N, 1, 89, 123);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3O.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3N($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('BarChart2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BarChart2> was created with unknown prop '${key}'`);
	});

	return [];
}

class BarChart2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3N, create_fragment$3O, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BarChart2",
			options,
			id: create_fragment$3O.name
		});
	}
}

var BarChart2$1 = BarChart2;

/* ../../components/ui/src/icons/feather/BatteryCharging.svelte generated by Svelte v3.44.2 */

const file$3M = "../../components/ui/src/icons/feather/BatteryCharging.svelte";

function create_fragment$3N(ctx) {
	let path;
	let line;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19");
			add_location(path, file$3M, 1, 0, 34);
			attr_dev(line, "x1", "23");
			attr_dev(line, "y1", "13");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "11");
			add_location(line, file$3M, 1, 103, 137);
			attr_dev(polyline, "points", "11 6 7 12 13 12 9 18");
			add_location(polyline, file$3M, 1, 148, 182);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3N.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3M($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('BatteryCharging', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BatteryCharging> was created with unknown prop '${key}'`);
	});

	return [];
}

class BatteryCharging extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3M, create_fragment$3N, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BatteryCharging",
			options,
			id: create_fragment$3N.name
		});
	}
}

var BatteryCharging$1 = BatteryCharging;

/* ../../components/ui/src/icons/feather/Battery.svelte generated by Svelte v3.44.2 */

const file$3L = "../../components/ui/src/icons/feather/Battery.svelte";

function create_fragment$3M(ctx) {
	let rect;
	let line;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "1");
			attr_dev(rect, "y", "6");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "12");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$3L, 1, 0, 34);
			attr_dev(line, "x1", "23");
			attr_dev(line, "y1", "13");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "11");
			add_location(line, file$3L, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3M.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3L($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Battery', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Battery> was created with unknown prop '${key}'`);
	});

	return [];
}

class Battery extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3L, create_fragment$3M, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Battery",
			options,
			id: create_fragment$3M.name
		});
	}
}

var Battery$1 = Battery;

/* ../../components/ui/src/icons/feather/BellOff.svelte generated by Svelte v3.44.2 */

const file$3K = "../../components/ui/src/icons/feather/BellOff.svelte";

function create_fragment$3L(ctx) {
	let path0;
	let path1;
	let path2;
	let path3;
	let line;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			path2 = claim_svg_element(nodes, "path", { d: true });
			children(path2).forEach(detach_dev);
			path3 = claim_svg_element(nodes, "path", { d: true });
			children(path3).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M13.73 21a2 2 0 0 1-3.46 0");
			add_location(path0, file$3K, 1, 0, 34);
			attr_dev(path1, "d", "M18.63 13A17.89 17.89 0 0 1 18 8");
			add_location(path1, file$3K, 1, 44, 78);
			attr_dev(path2, "d", "M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14");
			add_location(path2, file$3K, 1, 94, 128);
			attr_dev(path3, "d", "M18 8a6 6 0 0 0-9.33-5");
			add_location(path3, file$3K, 1, 157, 191);
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "23");
			add_location(line, file$3K, 1, 197, 231);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, path2, anchor);
			insert_hydration_dev(target, path3, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(path2);
			if (detaching) detach_dev(path3);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3L.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3K($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('BellOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BellOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class BellOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3K, create_fragment$3L, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BellOff",
			options,
			id: create_fragment$3L.name
		});
	}
}

var BellOff$1 = BellOff;

/* ../../components/ui/src/icons/feather/Bell.svelte generated by Svelte v3.44.2 */

const file$3J = "../../components/ui/src/icons/feather/Bell.svelte";

function create_fragment$3K(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9");
			add_location(path0, file$3J, 1, 0, 34);
			attr_dev(path1, "d", "M13.73 21a2 2 0 0 1-3.46 0");
			add_location(path1, file$3J, 1, 61, 95);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3K.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3J($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Bell', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bell> was created with unknown prop '${key}'`);
	});

	return [];
}

class Bell extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3J, create_fragment$3K, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Bell",
			options,
			id: create_fragment$3K.name
		});
	}
}

var Bell$1 = Bell;

/* ../../components/ui/src/icons/feather/Bluetooth.svelte generated by Svelte v3.44.2 */

const file$3I = "../../components/ui/src/icons/feather/Bluetooth.svelte";

function create_fragment$3J(ctx) {
	let polyline;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5");
			add_location(polyline, file$3I, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3J.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3I($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Bluetooth', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bluetooth> was created with unknown prop '${key}'`);
	});

	return [];
}

class Bluetooth extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3I, create_fragment$3J, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Bluetooth",
			options,
			id: create_fragment$3J.name
		});
	}
}

var Bluetooth$1 = Bluetooth;

/* ../../components/ui/src/icons/feather/Bold.svelte generated by Svelte v3.44.2 */

const file$3H = "../../components/ui/src/icons/feather/Bold.svelte";

function create_fragment$3I(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z");
			add_location(path0, file$3H, 1, 0, 34);
			attr_dev(path1, "d", "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z");
			add_location(path1, file$3H, 1, 55, 89);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3I.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3H($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Bold', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bold> was created with unknown prop '${key}'`);
	});

	return [];
}

class Bold extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3H, create_fragment$3I, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Bold",
			options,
			id: create_fragment$3I.name
		});
	}
}

var Bold$1 = Bold;

/* ../../components/ui/src/icons/feather/BookOpen.svelte generated by Svelte v3.44.2 */

const file$3G = "../../components/ui/src/icons/feather/BookOpen.svelte";

function create_fragment$3H(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z");
			add_location(path0, file$3G, 1, 0, 34);
			attr_dev(path1, "d", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z");
			add_location(path1, file$3G, 1, 58, 92);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3H.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3G($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('BookOpen', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BookOpen> was created with unknown prop '${key}'`);
	});

	return [];
}

class BookOpen extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3G, create_fragment$3H, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BookOpen",
			options,
			id: create_fragment$3H.name
		});
	}
}

var BookOpen$1 = BookOpen;

/* ../../components/ui/src/icons/feather/Book.svelte generated by Svelte v3.44.2 */

const file$3F = "../../components/ui/src/icons/feather/Book.svelte";

function create_fragment$3G(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M4 19.5A2.5 2.5 0 0 1 6.5 17H20");
			add_location(path0, file$3F, 1, 0, 34);
			attr_dev(path1, "d", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z");
			add_location(path1, file$3F, 1, 49, 83);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3G.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3F($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Book', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Book> was created with unknown prop '${key}'`);
	});

	return [];
}

class Book extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3F, create_fragment$3G, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Book",
			options,
			id: create_fragment$3G.name
		});
	}
}

var Book$1 = Book;

/* ../../components/ui/src/icons/feather/Bookmark.svelte generated by Svelte v3.44.2 */

const file$3E = "../../components/ui/src/icons/feather/Bookmark.svelte";

function create_fragment$3F(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z");
			add_location(path, file$3E, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3F.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3E($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Bookmark', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bookmark> was created with unknown prop '${key}'`);
	});

	return [];
}

class Bookmark extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3E, create_fragment$3F, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Bookmark",
			options,
			id: create_fragment$3F.name
		});
	}
}

var Bookmark$1 = Bookmark;

/* ../../components/ui/src/icons/feather/Box.svelte generated by Svelte v3.44.2 */

const file$3D = "../../components/ui/src/icons/feather/Box.svelte";

function create_fragment$3E(ctx) {
	let path;
	let polyline;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z");
			add_location(path, file$3D, 1, 0, 34);
			attr_dev(polyline, "points", "3.27 6.96 12 12.01 20.73 6.96");
			add_location(polyline, file$3D, 1, 139, 173);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "22.08");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "12");
			add_location(line, file$3D, 1, 199, 233);
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
		block,
		id: create_fragment$3E.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3D($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Box', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Box> was created with unknown prop '${key}'`);
	});

	return [];
}

class Box extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3D, create_fragment$3E, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Box",
			options,
			id: create_fragment$3E.name
		});
	}
}

var Box$1 = Box;

/* ../../components/ui/src/icons/feather/Briefcase.svelte generated by Svelte v3.44.2 */

const file$3C = "../../components/ui/src/icons/feather/Briefcase.svelte";

function create_fragment$3D(ctx) {
	let rect;
	let path;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "2");
			attr_dev(rect, "y", "7");
			attr_dev(rect, "width", "20");
			attr_dev(rect, "height", "14");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$3C, 1, 0, 34);
			attr_dev(path, "d", "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16");
			add_location(path, file$3C, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3D.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3C($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Briefcase', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Briefcase> was created with unknown prop '${key}'`);
	});

	return [];
}

class Briefcase extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3C, create_fragment$3D, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Briefcase",
			options,
			id: create_fragment$3D.name
		});
	}
}

var Briefcase$1 = Briefcase;

/* ../../components/ui/src/icons/feather/Calendar.svelte generated by Svelte v3.44.2 */

const file$3B = "../../components/ui/src/icons/feather/Calendar.svelte";

function create_fragment$3C(ctx) {
	let rect;
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "4");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$3B, 1, 0, 34);
			attr_dev(line0, "x1", "16");
			attr_dev(line0, "y1", "2");
			attr_dev(line0, "x2", "16");
			attr_dev(line0, "y2", "6");
			add_location(line0, file$3B, 1, 62, 96);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "2");
			attr_dev(line1, "x2", "8");
			attr_dev(line1, "y2", "6");
			add_location(line1, file$3B, 1, 105, 139);
			attr_dev(line2, "x1", "3");
			attr_dev(line2, "y1", "10");
			attr_dev(line2, "x2", "21");
			attr_dev(line2, "y2", "10");
			add_location(line2, file$3B, 1, 146, 180);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3C.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3B($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Calendar', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Calendar> was created with unknown prop '${key}'`);
	});

	return [];
}

class Calendar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3B, create_fragment$3C, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Calendar",
			options,
			id: create_fragment$3C.name
		});
	}
}

var Calendar$1 = Calendar;

/* ../../components/ui/src/icons/feather/CameraOff.svelte generated by Svelte v3.44.2 */

const file$3A = "../../components/ui/src/icons/feather/CameraOff.svelte";

function create_fragment$3B(ctx) {
	let line;
	let path;

	const block = {
		c: function create() {
			line = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "23");
			add_location(line, file$3A, 1, 0, 34);
			attr_dev(path, "d", "M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56");
			add_location(path, file$3A, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3B.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3A($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CameraOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CameraOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class CameraOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3A, create_fragment$3B, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CameraOff",
			options,
			id: create_fragment$3B.name
		});
	}
}

var CameraOff$1 = CameraOff;

/* ../../components/ui/src/icons/feather/Camera.svelte generated by Svelte v3.44.2 */

const file$3z = "../../components/ui/src/icons/feather/Camera.svelte";

function create_fragment$3A(ctx) {
	let path;
	let circle;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z");
			add_location(path, file$3z, 1, 0, 34);
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "13");
			attr_dev(circle, "r", "4");
			add_location(circle, file$3z, 1, 99, 133);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3A.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Camera', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Camera> was created with unknown prop '${key}'`);
	});

	return [];
}

class Camera extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3z, create_fragment$3A, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Camera",
			options,
			id: create_fragment$3A.name
		});
	}
}

var Camera$1 = Camera;

/* ../../components/ui/src/icons/feather/Cast.svelte generated by Svelte v3.44.2 */

const file$3y = "../../components/ui/src/icons/feather/Cast.svelte";

function create_fragment$3z(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6");
			add_location(path, file$3y, 1, 0, 34);
			attr_dev(line, "x1", "2");
			attr_dev(line, "y1", "20");
			attr_dev(line, "x2", "2.01");
			attr_dev(line, "y2", "20");
			add_location(line, file$3y, 1, 125, 159);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Cast', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cast> was created with unknown prop '${key}'`);
	});

	return [];
}

class Cast extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3y, create_fragment$3z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Cast",
			options,
			id: create_fragment$3z.name
		});
	}
}

var Cast$1 = Cast;

/* ../../components/ui/src/icons/feather/CheckCircle.svelte generated by Svelte v3.44.2 */

const file$3x = "../../components/ui/src/icons/feather/CheckCircle.svelte";

function create_fragment$3y(ctx) {
	let path;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22 11.08V12a10 10 0 1 1-5.93-9.14");
			add_location(path, file$3x, 1, 0, 34);
			attr_dev(polyline, "points", "22 4 12 14.01 9 11.01");
			add_location(polyline, file$3x, 1, 52, 86);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3x($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CheckCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CheckCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class CheckCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3x, create_fragment$3y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CheckCircle",
			options,
			id: create_fragment$3y.name
		});
	}
}

var CheckCircle$1 = CheckCircle;

/* ../../components/ui/src/icons/feather/Check.svelte generated by Svelte v3.44.2 */

const file$3w = "../../components/ui/src/icons/feather/Check.svelte";

function create_fragment$3x(ctx) {
	let polyline;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "20 6 9 17 4 12");
			add_location(polyline, file$3w, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3x.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3w($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Check', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Check> was created with unknown prop '${key}'`);
	});

	return [];
}

class Check extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3w, create_fragment$3x, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Check",
			options,
			id: create_fragment$3x.name
		});
	}
}

var Check$1 = Check;

/* ../../components/ui/src/icons/feather/ChevronsDown.svelte generated by Svelte v3.44.2 */

const file$3v = "../../components/ui/src/icons/feather/ChevronsDown.svelte";

function create_fragment$3w(ctx) {
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "7 13 12 18 17 13");
			add_location(polyline0, file$3v, 1, 0, 34);
			attr_dev(polyline1, "points", "7 6 12 11 17 6");
			add_location(polyline1, file$3v, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3w.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3v($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ChevronsDown', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronsDown> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronsDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3v, create_fragment$3w, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronsDown",
			options,
			id: create_fragment$3w.name
		});
	}
}

var ChevronsDown$1 = ChevronsDown;

/* ../../components/ui/src/icons/feather/ChevronsLeft.svelte generated by Svelte v3.44.2 */

const file$3u = "../../components/ui/src/icons/feather/ChevronsLeft.svelte";

function create_fragment$3v(ctx) {
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "11 17 6 12 11 7");
			add_location(polyline0, file$3u, 1, 0, 34);
			attr_dev(polyline1, "points", "18 17 13 12 18 7");
			add_location(polyline1, file$3u, 1, 46, 80);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3v.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3u($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ChevronsLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronsLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronsLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3u, create_fragment$3v, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronsLeft",
			options,
			id: create_fragment$3v.name
		});
	}
}

var ChevronsLeft$1 = ChevronsLeft;

/* ../../components/ui/src/icons/feather/ChevronsRight.svelte generated by Svelte v3.44.2 */

const file$3t = "../../components/ui/src/icons/feather/ChevronsRight.svelte";

function create_fragment$3u(ctx) {
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "13 17 18 12 13 7");
			add_location(polyline0, file$3t, 1, 0, 34);
			attr_dev(polyline1, "points", "6 17 11 12 6 7");
			add_location(polyline1, file$3t, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3u.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3t($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ChevronsRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronsRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronsRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3t, create_fragment$3u, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronsRight",
			options,
			id: create_fragment$3u.name
		});
	}
}

var ChevronsRight$1 = ChevronsRight;

/* ../../components/ui/src/icons/feather/ChevronsUp.svelte generated by Svelte v3.44.2 */

const file$3s = "../../components/ui/src/icons/feather/ChevronsUp.svelte";

function create_fragment$3t(ctx) {
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "17 11 12 6 7 11");
			add_location(polyline0, file$3s, 1, 0, 34);
			attr_dev(polyline1, "points", "17 18 12 13 7 18");
			add_location(polyline1, file$3s, 1, 46, 80);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3t.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3s($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ChevronsUp', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronsUp> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronsUp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3s, create_fragment$3t, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronsUp",
			options,
			id: create_fragment$3t.name
		});
	}
}

var ChevronsUp$1 = ChevronsUp;

/* ../../components/ui/src/icons/feather/Chrome.svelte generated by Svelte v3.44.2 */

const file$3r = "../../components/ui/src/icons/feather/Chrome.svelte";

function create_fragment$3s(ctx) {
	let circle0;
	let circle1;
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "12");
			attr_dev(circle0, "r", "10");
			add_location(circle0, file$3r, 1, 0, 34);
			attr_dev(circle1, "cx", "12");
			attr_dev(circle1, "cy", "12");
			attr_dev(circle1, "r", "4");
			add_location(circle1, file$3r, 1, 40, 74);
			attr_dev(line0, "x1", "21.17");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "8");
			add_location(line0, file$3r, 1, 79, 113);
			attr_dev(line1, "x1", "3.95");
			attr_dev(line1, "y1", "6.06");
			attr_dev(line1, "x2", "8.54");
			attr_dev(line1, "y2", "14");
			add_location(line1, file$3r, 1, 125, 159);
			attr_dev(line2, "x1", "10.88");
			attr_dev(line2, "y1", "21.94");
			attr_dev(line2, "x2", "15.46");
			attr_dev(line2, "y2", "14");
			add_location(line2, file$3r, 1, 176, 210);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3s.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3r($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Chrome', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Chrome> was created with unknown prop '${key}'`);
	});

	return [];
}

class Chrome extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3r, create_fragment$3s, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Chrome",
			options,
			id: create_fragment$3s.name
		});
	}
}

var Chrome$1 = Chrome;

/* ../../components/ui/src/icons/feather/Circle.svelte generated by Svelte v3.44.2 */

const file$3q = "../../components/ui/src/icons/feather/Circle.svelte";

function create_fragment$3r(ctx) {
	let circle;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$3q, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3r.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Circle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Circle> was created with unknown prop '${key}'`);
	});

	return [];
}

class Circle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3q, create_fragment$3r, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Circle",
			options,
			id: create_fragment$3r.name
		});
	}
}

var Circle$1 = Circle;

/* ../../components/ui/src/icons/feather/Clipboard.svelte generated by Svelte v3.44.2 */

const file$3p = "../../components/ui/src/icons/feather/Clipboard.svelte";

function create_fragment$3q(ctx) {
	let path;
	let rect;

	const block = {
		c: function create() {
			path = svg_element("path");
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);

			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2");
			add_location(path, file$3p, 1, 0, 34);
			attr_dev(rect, "x", "8");
			attr_dev(rect, "y", "2");
			attr_dev(rect, "width", "8");
			attr_dev(rect, "height", "4");
			attr_dev(rect, "rx", "1");
			attr_dev(rect, "ry", "1");
			add_location(rect, file$3p, 1, 90, 124);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, rect, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3p($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Clipboard', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Clipboard> was created with unknown prop '${key}'`);
	});

	return [];
}

class Clipboard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3p, create_fragment$3q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Clipboard",
			options,
			id: create_fragment$3q.name
		});
	}
}

var Clipboard$1 = Clipboard;

/* ../../components/ui/src/icons/feather/CloudDrizzle.svelte generated by Svelte v3.44.2 */

const file$3o = "../../components/ui/src/icons/feather/CloudDrizzle.svelte";

function create_fragment$3p(ctx) {
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;
	let path;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "8");
			attr_dev(line0, "y1", "19");
			attr_dev(line0, "x2", "8");
			attr_dev(line0, "y2", "21");
			add_location(line0, file$3o, 1, 0, 34);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "13");
			attr_dev(line1, "x2", "8");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$3o, 1, 43, 77);
			attr_dev(line2, "x1", "16");
			attr_dev(line2, "y1", "19");
			attr_dev(line2, "x2", "16");
			attr_dev(line2, "y2", "21");
			add_location(line2, file$3o, 1, 86, 120);
			attr_dev(line3, "x1", "16");
			attr_dev(line3, "y1", "13");
			attr_dev(line3, "x2", "16");
			attr_dev(line3, "y2", "15");
			add_location(line3, file$3o, 1, 131, 165);
			attr_dev(line4, "x1", "12");
			attr_dev(line4, "y1", "21");
			attr_dev(line4, "x2", "12");
			attr_dev(line4, "y2", "23");
			add_location(line4, file$3o, 1, 176, 210);
			attr_dev(line5, "x1", "12");
			attr_dev(line5, "y1", "15");
			attr_dev(line5, "x2", "12");
			attr_dev(line5, "y2", "17");
			add_location(line5, file$3o, 1, 221, 255);
			attr_dev(path, "d", "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25");
			add_location(path, file$3o, 1, 266, 300);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3p.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3o($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CloudDrizzle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CloudDrizzle> was created with unknown prop '${key}'`);
	});

	return [];
}

class CloudDrizzle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3o, create_fragment$3p, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CloudDrizzle",
			options,
			id: create_fragment$3p.name
		});
	}
}

var CloudDrizzle$1 = CloudDrizzle;

/* ../../components/ui/src/icons/feather/CloudLightning.svelte generated by Svelte v3.44.2 */

const file$3n = "../../components/ui/src/icons/feather/CloudLightning.svelte";

function create_fragment$3o(ctx) {
	let path;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9");
			add_location(path, file$3n, 1, 0, 34);
			attr_dev(polyline, "points", "13 11 9 17 15 17 11 23");
			add_location(polyline, file$3n, 1, 65, 99);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3o.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3n($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CloudLightning', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CloudLightning> was created with unknown prop '${key}'`);
	});

	return [];
}

class CloudLightning extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3n, create_fragment$3o, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CloudLightning",
			options,
			id: create_fragment$3o.name
		});
	}
}

var CloudLightning$1 = CloudLightning;

/* ../../components/ui/src/icons/feather/CloudOff.svelte generated by Svelte v3.44.2 */

const file$3m = "../../components/ui/src/icons/feather/CloudOff.svelte";

function create_fragment$3n(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3");
			add_location(path, file$3m, 1, 0, 34);
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "23");
			add_location(line, file$3m, 1, 107, 141);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3m($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CloudOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CloudOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class CloudOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3m, create_fragment$3n, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CloudOff",
			options,
			id: create_fragment$3n.name
		});
	}
}

var CloudOff$1 = CloudOff;

/* ../../components/ui/src/icons/feather/CloudRain.svelte generated by Svelte v3.44.2 */

const file$3l = "../../components/ui/src/icons/feather/CloudRain.svelte";

function create_fragment$3m(ctx) {
	let line0;
	let line1;
	let line2;
	let path;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "16");
			attr_dev(line0, "y1", "13");
			attr_dev(line0, "x2", "16");
			attr_dev(line0, "y2", "21");
			add_location(line0, file$3l, 1, 0, 34);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "13");
			attr_dev(line1, "x2", "8");
			attr_dev(line1, "y2", "21");
			add_location(line1, file$3l, 1, 45, 79);
			attr_dev(line2, "x1", "12");
			attr_dev(line2, "y1", "15");
			attr_dev(line2, "x2", "12");
			attr_dev(line2, "y2", "23");
			add_location(line2, file$3l, 1, 88, 122);
			attr_dev(path, "d", "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25");
			add_location(path, file$3l, 1, 133, 167);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3l($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CloudRain', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CloudRain> was created with unknown prop '${key}'`);
	});

	return [];
}

class CloudRain extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3l, create_fragment$3m, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CloudRain",
			options,
			id: create_fragment$3m.name
		});
	}
}

var CloudRain$1 = CloudRain;

/* ../../components/ui/src/icons/feather/CloudSnow.svelte generated by Svelte v3.44.2 */

const file$3k = "../../components/ui/src/icons/feather/CloudSnow.svelte";

function create_fragment$3l(ctx) {
	let path;
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;

	const block = {
		c: function create() {
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25");
			add_location(path, file$3k, 1, 0, 34);
			attr_dev(line0, "x1", "8");
			attr_dev(line0, "y1", "16");
			attr_dev(line0, "x2", "8.01");
			attr_dev(line0, "y2", "16");
			add_location(line0, file$3k, 1, 66, 100);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "20");
			attr_dev(line1, "x2", "8.01");
			attr_dev(line1, "y2", "20");
			add_location(line1, file$3k, 1, 112, 146);
			attr_dev(line2, "x1", "12");
			attr_dev(line2, "y1", "18");
			attr_dev(line2, "x2", "12.01");
			attr_dev(line2, "y2", "18");
			add_location(line2, file$3k, 1, 158, 192);
			attr_dev(line3, "x1", "12");
			attr_dev(line3, "y1", "22");
			attr_dev(line3, "x2", "12.01");
			attr_dev(line3, "y2", "22");
			add_location(line3, file$3k, 1, 206, 240);
			attr_dev(line4, "x1", "16");
			attr_dev(line4, "y1", "16");
			attr_dev(line4, "x2", "16.01");
			attr_dev(line4, "y2", "16");
			add_location(line4, file$3k, 1, 254, 288);
			attr_dev(line5, "x1", "16");
			attr_dev(line5, "y1", "20");
			attr_dev(line5, "x2", "16.01");
			attr_dev(line5, "y2", "20");
			add_location(line5, file$3k, 1, 302, 336);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3k($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CloudSnow', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CloudSnow> was created with unknown prop '${key}'`);
	});

	return [];
}

class CloudSnow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3k, create_fragment$3l, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CloudSnow",
			options,
			id: create_fragment$3l.name
		});
	}
}

var CloudSnow$1 = CloudSnow;

/* ../../components/ui/src/icons/feather/Cloud.svelte generated by Svelte v3.44.2 */

const file$3j = "../../components/ui/src/icons/feather/Cloud.svelte";

function create_fragment$3k(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z");
			add_location(path, file$3j, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3j($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Cloud', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cloud> was created with unknown prop '${key}'`);
	});

	return [];
}

class Cloud extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3j, create_fragment$3k, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Cloud",
			options,
			id: create_fragment$3k.name
		});
	}
}

var Cloud$1 = Cloud;

/* ../../components/ui/src/icons/feather/Code.svelte generated by Svelte v3.44.2 */

const file$3i = "../../components/ui/src/icons/feather/Code.svelte";

function create_fragment$3j(ctx) {
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "16 18 22 12 16 6");
			add_location(polyline0, file$3i, 1, 0, 34);
			attr_dev(polyline1, "points", "8 6 2 12 8 18");
			add_location(polyline1, file$3i, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3i($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Code', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Code> was created with unknown prop '${key}'`);
	});

	return [];
}

class Code extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3i, create_fragment$3j, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Code",
			options,
			id: create_fragment$3j.name
		});
	}
}

var Code$1 = Code;

/* ../../components/ui/src/icons/feather/Codepen.svelte generated by Svelte v3.44.2 */

const file$3h = "../../components/ui/src/icons/feather/Codepen.svelte";

function create_fragment$3i(ctx) {
	let polygon;
	let line0;
	let polyline0;
	let polyline1;
	let line1;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			line0 = svg_element("line");
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2");
			add_location(polygon, file$3h, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "22");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "15.5");
			add_location(line0, file$3h, 1, 72, 106);
			attr_dev(polyline0, "points", "22 8.5 12 15.5 2 8.5");
			add_location(polyline0, file$3h, 1, 119, 153);
			attr_dev(polyline1, "points", "2 15.5 12 8.5 22 15.5");
			add_location(polyline1, file$3h, 1, 170, 204);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "2");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "8.5");
			add_location(line1, file$3h, 1, 222, 256);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3h($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Codepen', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Codepen> was created with unknown prop '${key}'`);
	});

	return [];
}

class Codepen extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3h, create_fragment$3i, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Codepen",
			options,
			id: create_fragment$3i.name
		});
	}
}

var Codepen$1 = Codepen;

/* ../../components/ui/src/icons/feather/Codesandbox.svelte generated by Svelte v3.44.2 */

const file$3g = "../../components/ui/src/icons/feather/Codesandbox.svelte";

function create_fragment$3h(ctx) {
	let path;
	let polyline0;
	let polyline1;
	let polyline2;
	let polyline3;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			polyline2 = svg_element("polyline");
			polyline3 = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			polyline2 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline2).forEach(detach_dev);
			polyline3 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline3).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z");
			add_location(path, file$3g, 1, 0, 34);
			attr_dev(polyline0, "points", "7.5 4.21 12 6.81 16.5 4.21");
			add_location(polyline0, file$3g, 1, 139, 173);
			attr_dev(polyline1, "points", "7.5 19.79 7.5 14.6 3 12");
			add_location(polyline1, file$3g, 1, 196, 230);
			attr_dev(polyline2, "points", "21 12 16.5 14.6 16.5 19.79");
			add_location(polyline2, file$3g, 1, 250, 284);
			attr_dev(polyline3, "points", "3.27 6.96 12 12.01 20.73 6.96");
			add_location(polyline3, file$3g, 1, 307, 341);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "22.08");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "12");
			add_location(line, file$3g, 1, 367, 401);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, polyline2, anchor);
			insert_hydration_dev(target, polyline3, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(polyline2);
			if (detaching) detach_dev(polyline3);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3g($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Codesandbox', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Codesandbox> was created with unknown prop '${key}'`);
	});

	return [];
}

class Codesandbox extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3g, create_fragment$3h, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Codesandbox",
			options,
			id: create_fragment$3h.name
		});
	}
}

var Codesandbox$1 = Codesandbox;

/* ../../components/ui/src/icons/feather/Coffee.svelte generated by Svelte v3.44.2 */

const file$3f = "../../components/ui/src/icons/feather/Coffee.svelte";

function create_fragment$3g(ctx) {
	let path0;
	let path1;
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M18 8h1a4 4 0 0 1 0 8h-1");
			add_location(path0, file$3f, 1, 0, 34);
			attr_dev(path1, "d", "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z");
			add_location(path1, file$3f, 1, 42, 76);
			attr_dev(line0, "x1", "6");
			attr_dev(line0, "y1", "1");
			attr_dev(line0, "x2", "6");
			attr_dev(line0, "y2", "4");
			add_location(line0, file$3f, 1, 102, 136);
			attr_dev(line1, "x1", "10");
			attr_dev(line1, "y1", "1");
			attr_dev(line1, "x2", "10");
			attr_dev(line1, "y2", "4");
			add_location(line1, file$3f, 1, 143, 177);
			attr_dev(line2, "x1", "14");
			attr_dev(line2, "y1", "1");
			attr_dev(line2, "x2", "14");
			attr_dev(line2, "y2", "4");
			add_location(line2, file$3f, 1, 186, 220);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3f($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Coffee', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Coffee> was created with unknown prop '${key}'`);
	});

	return [];
}

class Coffee extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3f, create_fragment$3g, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Coffee",
			options,
			id: create_fragment$3g.name
		});
	}
}

var Coffee$1 = Coffee;

/* ../../components/ui/src/icons/feather/Columns.svelte generated by Svelte v3.44.2 */

const file$3e = "../../components/ui/src/icons/feather/Columns.svelte";

function create_fragment$3f(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18");
			add_location(path, file$3e, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3e($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Columns', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Columns> was created with unknown prop '${key}'`);
	});

	return [];
}

class Columns extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3e, create_fragment$3f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Columns",
			options,
			id: create_fragment$3f.name
		});
	}
}

var Columns$1 = Columns;

/* ../../components/ui/src/icons/feather/Command.svelte generated by Svelte v3.44.2 */

const file$3d = "../../components/ui/src/icons/feather/Command.svelte";

function create_fragment$3e(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z");
			add_location(path, file$3d, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3d($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Command', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Command> was created with unknown prop '${key}'`);
	});

	return [];
}

class Command extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3d, create_fragment$3e, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Command",
			options,
			id: create_fragment$3e.name
		});
	}
}

var Command$1 = Command;

/* ../../components/ui/src/icons/feather/Compass.svelte generated by Svelte v3.44.2 */

const file$3c = "../../components/ui/src/icons/feather/Compass.svelte";

function create_fragment$3d(ctx) {
	let circle;
	let polygon;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$3c, 1, 0, 34);
			attr_dev(polygon, "points", "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76");
			add_location(polygon, file$3c, 1, 40, 74);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3c($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Compass', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Compass> was created with unknown prop '${key}'`);
	});

	return [];
}

class Compass extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3c, create_fragment$3d, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Compass",
			options,
			id: create_fragment$3d.name
		});
	}
}

var Compass$1 = Compass;

/* ../../components/ui/src/icons/feather/Copy.svelte generated by Svelte v3.44.2 */

const file$3b = "../../components/ui/src/icons/feather/Copy.svelte";

function create_fragment$3c(ctx) {
	let rect;
	let path;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "9");
			attr_dev(rect, "y", "9");
			attr_dev(rect, "width", "13");
			attr_dev(rect, "height", "13");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$3b, 1, 0, 34);
			attr_dev(path, "d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1");
			add_location(path, file$3b, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3b($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Copy', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Copy> was created with unknown prop '${key}'`);
	});

	return [];
}

class Copy extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3b, create_fragment$3c, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Copy",
			options,
			id: create_fragment$3c.name
		});
	}
}

var Copy$1 = Copy;

/* ../../components/ui/src/icons/feather/CornerDownLeft.svelte generated by Svelte v3.44.2 */

const file$3a = "../../components/ui/src/icons/feather/CornerDownLeft.svelte";

function create_fragment$3b(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "9 10 4 15 9 20");
			add_location(polyline, file$3a, 1, 0, 34);
			attr_dev(path, "d", "M20 4v7a4 4 0 0 1-4 4H4");
			add_location(path, file$3a, 1, 45, 79);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3a($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerDownLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerDownLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerDownLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3a, create_fragment$3b, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerDownLeft",
			options,
			id: create_fragment$3b.name
		});
	}
}

var CornerDownLeft$1 = CornerDownLeft;

/* ../../components/ui/src/icons/feather/CornerDownRight.svelte generated by Svelte v3.44.2 */

const file$39 = "../../components/ui/src/icons/feather/CornerDownRight.svelte";

function create_fragment$3a(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "15 10 20 15 15 20");
			add_location(polyline, file$39, 1, 0, 34);
			attr_dev(path, "d", "M4 4v7a4 4 0 0 0 4 4h12");
			add_location(path, file$39, 1, 48, 82);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$39($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerDownRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerDownRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerDownRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$39, create_fragment$3a, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerDownRight",
			options,
			id: create_fragment$3a.name
		});
	}
}

var CornerDownRight$1 = CornerDownRight;

/* ../../components/ui/src/icons/feather/CornerLeftDown.svelte generated by Svelte v3.44.2 */

const file$38 = "../../components/ui/src/icons/feather/CornerLeftDown.svelte";

function create_fragment$39(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "14 15 9 20 4 15");
			add_location(polyline, file$38, 1, 0, 34);
			attr_dev(path, "d", "M20 4h-7a4 4 0 0 0-4 4v12");
			add_location(path, file$38, 1, 46, 80);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$39.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$38($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerLeftDown', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerLeftDown> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerLeftDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$38, create_fragment$39, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerLeftDown",
			options,
			id: create_fragment$39.name
		});
	}
}

var CornerLeftDown$1 = CornerLeftDown;

/* ../../components/ui/src/icons/feather/CornerLeftUp.svelte generated by Svelte v3.44.2 */

const file$37 = "../../components/ui/src/icons/feather/CornerLeftUp.svelte";

function create_fragment$38(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "14 9 9 4 4 9");
			add_location(polyline, file$37, 1, 0, 34);
			attr_dev(path, "d", "M20 20h-7a4 4 0 0 1-4-4V4");
			add_location(path, file$37, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$38.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$37($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerLeftUp', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerLeftUp> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerLeftUp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$37, create_fragment$38, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerLeftUp",
			options,
			id: create_fragment$38.name
		});
	}
}

var CornerLeftUp$1 = CornerLeftUp;

/* ../../components/ui/src/icons/feather/CornerRightDown.svelte generated by Svelte v3.44.2 */

const file$36 = "../../components/ui/src/icons/feather/CornerRightDown.svelte";

function create_fragment$37(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "10 15 15 20 20 15");
			add_location(polyline, file$36, 1, 0, 34);
			attr_dev(path, "d", "M4 4h7a4 4 0 0 1 4 4v12");
			add_location(path, file$36, 1, 48, 82);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$37.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$36($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerRightDown', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerRightDown> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerRightDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$36, create_fragment$37, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerRightDown",
			options,
			id: create_fragment$37.name
		});
	}
}

var CornerRightDown$1 = CornerRightDown;

/* ../../components/ui/src/icons/feather/CornerRightUp.svelte generated by Svelte v3.44.2 */

const file$35 = "../../components/ui/src/icons/feather/CornerRightUp.svelte";

function create_fragment$36(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "10 9 15 4 20 9");
			add_location(polyline, file$35, 1, 0, 34);
			attr_dev(path, "d", "M4 20h7a4 4 0 0 0 4-4V4");
			add_location(path, file$35, 1, 45, 79);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$36.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$35($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerRightUp', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerRightUp> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerRightUp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$35, create_fragment$36, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerRightUp",
			options,
			id: create_fragment$36.name
		});
	}
}

var CornerRightUp$1 = CornerRightUp;

/* ../../components/ui/src/icons/feather/CornerUpLeft.svelte generated by Svelte v3.44.2 */

const file$34 = "../../components/ui/src/icons/feather/CornerUpLeft.svelte";

function create_fragment$35(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "9 14 4 9 9 4");
			add_location(polyline, file$34, 1, 0, 34);
			attr_dev(path, "d", "M20 20v-7a4 4 0 0 0-4-4H4");
			add_location(path, file$34, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$35.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$34($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerUpLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerUpLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerUpLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$34, create_fragment$35, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerUpLeft",
			options,
			id: create_fragment$35.name
		});
	}
}

var CornerUpLeft$1 = CornerUpLeft;

/* ../../components/ui/src/icons/feather/CornerUpRight.svelte generated by Svelte v3.44.2 */

const file$33 = "../../components/ui/src/icons/feather/CornerUpRight.svelte";

function create_fragment$34(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "15 14 20 9 15 4");
			add_location(polyline, file$33, 1, 0, 34);
			attr_dev(path, "d", "M4 20v-7a4 4 0 0 1 4-4h12");
			add_location(path, file$33, 1, 46, 80);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$34.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$33($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CornerUpRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CornerUpRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class CornerUpRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$33, create_fragment$34, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CornerUpRight",
			options,
			id: create_fragment$34.name
		});
	}
}

var CornerUpRight$1 = CornerUpRight;

/* ../../components/ui/src/icons/feather/Cpu.svelte generated by Svelte v3.44.2 */

const file$32 = "../../components/ui/src/icons/feather/Cpu.svelte";

function create_fragment$33(ctx) {
	let rect0;
	let rect1;
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;
	let line6;
	let line7;

	const block = {
		c: function create() {
			rect0 = svg_element("rect");
			rect1 = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			line6 = svg_element("line");
			line7 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect0 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect0).forEach(detach_dev);

			rect1 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			line6 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line6).forEach(detach_dev);
			line7 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line7).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect0, "x", "4");
			attr_dev(rect0, "y", "4");
			attr_dev(rect0, "width", "16");
			attr_dev(rect0, "height", "16");
			attr_dev(rect0, "rx", "2");
			attr_dev(rect0, "ry", "2");
			add_location(rect0, file$32, 1, 0, 34);
			attr_dev(rect1, "x", "9");
			attr_dev(rect1, "y", "9");
			attr_dev(rect1, "width", "6");
			attr_dev(rect1, "height", "6");
			add_location(rect1, file$32, 1, 62, 96);
			attr_dev(line0, "x1", "9");
			attr_dev(line0, "y1", "1");
			attr_dev(line0, "x2", "9");
			attr_dev(line0, "y2", "4");
			add_location(line0, file$32, 1, 108, 142);
			attr_dev(line1, "x1", "15");
			attr_dev(line1, "y1", "1");
			attr_dev(line1, "x2", "15");
			attr_dev(line1, "y2", "4");
			add_location(line1, file$32, 1, 149, 183);
			attr_dev(line2, "x1", "9");
			attr_dev(line2, "y1", "20");
			attr_dev(line2, "x2", "9");
			attr_dev(line2, "y2", "23");
			add_location(line2, file$32, 1, 192, 226);
			attr_dev(line3, "x1", "15");
			attr_dev(line3, "y1", "20");
			attr_dev(line3, "x2", "15");
			attr_dev(line3, "y2", "23");
			add_location(line3, file$32, 1, 235, 269);
			attr_dev(line4, "x1", "20");
			attr_dev(line4, "y1", "9");
			attr_dev(line4, "x2", "23");
			attr_dev(line4, "y2", "9");
			add_location(line4, file$32, 1, 280, 314);
			attr_dev(line5, "x1", "20");
			attr_dev(line5, "y1", "14");
			attr_dev(line5, "x2", "23");
			attr_dev(line5, "y2", "14");
			add_location(line5, file$32, 1, 323, 357);
			attr_dev(line6, "x1", "1");
			attr_dev(line6, "y1", "9");
			attr_dev(line6, "x2", "4");
			attr_dev(line6, "y2", "9");
			add_location(line6, file$32, 1, 368, 402);
			attr_dev(line7, "x1", "1");
			attr_dev(line7, "y1", "14");
			attr_dev(line7, "x2", "4");
			attr_dev(line7, "y2", "14");
			add_location(line7, file$32, 1, 409, 443);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect0, anchor);
			insert_hydration_dev(target, rect1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
			insert_hydration_dev(target, line6, anchor);
			insert_hydration_dev(target, line7, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect0);
			if (detaching) detach_dev(rect1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
			if (detaching) detach_dev(line6);
			if (detaching) detach_dev(line7);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$33.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$32($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Cpu', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cpu> was created with unknown prop '${key}'`);
	});

	return [];
}

class Cpu extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$32, create_fragment$33, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Cpu",
			options,
			id: create_fragment$33.name
		});
	}
}

var Cpu$1 = Cpu;

/* ../../components/ui/src/icons/feather/CreditCard.svelte generated by Svelte v3.44.2 */

const file$31 = "../../components/ui/src/icons/feather/CreditCard.svelte";

function create_fragment$32(ctx) {
	let rect;
	let line;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "1");
			attr_dev(rect, "y", "4");
			attr_dev(rect, "width", "22");
			attr_dev(rect, "height", "16");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$31, 1, 0, 34);
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "10");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "10");
			add_location(line, file$31, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$32.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$31($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CreditCard', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CreditCard> was created with unknown prop '${key}'`);
	});

	return [];
}

class CreditCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$31, create_fragment$32, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CreditCard",
			options,
			id: create_fragment$32.name
		});
	}
}

var CreditCard$1 = CreditCard;

/* ../../components/ui/src/icons/feather/Crop.svelte generated by Svelte v3.44.2 */

const file$30 = "../../components/ui/src/icons/feather/Crop.svelte";

function create_fragment$31(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M6.13 1L6 16a2 2 0 0 0 2 2h15");
			add_location(path0, file$30, 1, 0, 34);
			attr_dev(path1, "d", "M1 6.13L16 6a2 2 0 0 1 2 2v15");
			add_location(path1, file$30, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$31.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$30($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Crop', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Crop> was created with unknown prop '${key}'`);
	});

	return [];
}

class Crop extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$30, create_fragment$31, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Crop",
			options,
			id: create_fragment$31.name
		});
	}
}

var Crop$1 = Crop;

/* ../../components/ui/src/icons/feather/Crosshair.svelte generated by Svelte v3.44.2 */

const file$2$ = "../../components/ui/src/icons/feather/Crosshair.svelte";

function create_fragment$30(ctx) {
	let circle;
	let line0;
	let line1;
	let line2;
	let line3;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$2$, 1, 0, 34);
			attr_dev(line0, "x1", "22");
			attr_dev(line0, "y1", "12");
			attr_dev(line0, "x2", "18");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$2$, 1, 40, 74);
			attr_dev(line1, "x1", "6");
			attr_dev(line1, "y1", "12");
			attr_dev(line1, "x2", "2");
			attr_dev(line1, "y2", "12");
			add_location(line1, file$2$, 1, 85, 119);
			attr_dev(line2, "x1", "12");
			attr_dev(line2, "y1", "6");
			attr_dev(line2, "x2", "12");
			attr_dev(line2, "y2", "2");
			add_location(line2, file$2$, 1, 128, 162);
			attr_dev(line3, "x1", "12");
			attr_dev(line3, "y1", "22");
			attr_dev(line3, "x2", "12");
			attr_dev(line3, "y2", "18");
			add_location(line3, file$2$, 1, 171, 205);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$30.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2$($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Crosshair', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Crosshair> was created with unknown prop '${key}'`);
	});

	return [];
}

class Crosshair extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2$, create_fragment$30, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Crosshair",
			options,
			id: create_fragment$30.name
		});
	}
}

var Crosshair$1 = Crosshair;

/* ../../components/ui/src/icons/feather/Database.svelte generated by Svelte v3.44.2 */

const file$2_ = "../../components/ui/src/icons/feather/Database.svelte";

function create_fragment$2$(ctx) {
	let ellipse;
	let path0;
	let path1;

	const block = {
		c: function create() {
			ellipse = svg_element("ellipse");
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			ellipse = claim_svg_element(nodes, "ellipse", { cx: true, cy: true, rx: true, ry: true });
			children(ellipse).forEach(detach_dev);
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ellipse, "cx", "12");
			attr_dev(ellipse, "cy", "5");
			attr_dev(ellipse, "rx", "9");
			attr_dev(ellipse, "ry", "3");
			add_location(ellipse, file$2_, 1, 0, 34);
			attr_dev(path0, "d", "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3");
			add_location(path0, file$2_, 1, 48, 82);
			attr_dev(path1, "d", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5");
			add_location(path1, file$2_, 1, 99, 133);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, ellipse, anchor);
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(ellipse);
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2$.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2_($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Database', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Database> was created with unknown prop '${key}'`);
	});

	return [];
}

class Database extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2_, create_fragment$2$, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Database",
			options,
			id: create_fragment$2$.name
		});
	}
}

var Database$1 = Database;

/* ../../components/ui/src/icons/feather/Delete.svelte generated by Svelte v3.44.2 */

const file$2Z = "../../components/ui/src/icons/feather/Delete.svelte";

function create_fragment$2_(ctx) {
	let path;
	let line0;
	let line1;

	const block = {
		c: function create() {
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z");
			add_location(path, file$2Z, 1, 0, 34);
			attr_dev(line0, "x1", "18");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "15");
			add_location(line0, file$2Z, 1, 68, 102);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "18");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$2Z, 1, 112, 146);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2_.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2Z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Delete', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Delete> was created with unknown prop '${key}'`);
	});

	return [];
}

class Delete extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2Z, create_fragment$2_, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Delete",
			options,
			id: create_fragment$2_.name
		});
	}
}

var Delete$1 = Delete;

/* ../../components/ui/src/icons/feather/Disc.svelte generated by Svelte v3.44.2 */

const file$2Y = "../../components/ui/src/icons/feather/Disc.svelte";

function create_fragment$2Z(ctx) {
	let circle0;
	let circle1;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "12");
			attr_dev(circle0, "r", "10");
			add_location(circle0, file$2Y, 1, 0, 34);
			attr_dev(circle1, "cx", "12");
			attr_dev(circle1, "cy", "12");
			attr_dev(circle1, "r", "3");
			add_location(circle1, file$2Y, 1, 40, 74);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2Z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2Y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Disc', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Disc> was created with unknown prop '${key}'`);
	});

	return [];
}

class Disc extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2Y, create_fragment$2Z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Disc",
			options,
			id: create_fragment$2Z.name
		});
	}
}

var Disc$1 = Disc;

/* ../../components/ui/src/icons/feather/DivideCircle.svelte generated by Svelte v3.44.2 */

const file$2X = "../../components/ui/src/icons/feather/DivideCircle.svelte";

function create_fragment$2Y(ctx) {
	let line0;
	let line1;
	let line2;
	let circle;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "8");
			attr_dev(line0, "y1", "12");
			attr_dev(line0, "x2", "16");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$2X, 1, 0, 34);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "16");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "16");
			add_location(line1, file$2X, 1, 44, 78);
			attr_dev(line2, "x1", "12");
			attr_dev(line2, "y1", "8");
			attr_dev(line2, "x2", "12");
			attr_dev(line2, "y2", "8");
			add_location(line2, file$2X, 1, 89, 123);
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$2X, 1, 132, 166);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2Y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2X($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('DivideCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DivideCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class DivideCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2X, create_fragment$2Y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "DivideCircle",
			options,
			id: create_fragment$2Y.name
		});
	}
}

var DivideCircle$1 = DivideCircle;

/* ../../components/ui/src/icons/feather/DivideSquare.svelte generated by Svelte v3.44.2 */

const file$2W = "../../components/ui/src/icons/feather/DivideSquare.svelte";

function create_fragment$2X(ctx) {
	let rect;
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$2W, 1, 0, 34);
			attr_dev(line0, "x1", "8");
			attr_dev(line0, "y1", "12");
			attr_dev(line0, "x2", "16");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$2W, 1, 62, 96);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "16");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "16");
			add_location(line1, file$2W, 1, 106, 140);
			attr_dev(line2, "x1", "12");
			attr_dev(line2, "y1", "8");
			attr_dev(line2, "x2", "12");
			attr_dev(line2, "y2", "8");
			add_location(line2, file$2W, 1, 151, 185);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2X.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2W($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('DivideSquare', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DivideSquare> was created with unknown prop '${key}'`);
	});

	return [];
}

class DivideSquare extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2W, create_fragment$2X, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "DivideSquare",
			options,
			id: create_fragment$2X.name
		});
	}
}

var DivideSquare$1 = DivideSquare;

/* ../../components/ui/src/icons/feather/Divide.svelte generated by Svelte v3.44.2 */

const file$2V = "../../components/ui/src/icons/feather/Divide.svelte";

function create_fragment$2W(ctx) {
	let circle0;
	let line;
	let circle1;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			line = svg_element("line");
			circle1 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "6");
			attr_dev(circle0, "r", "2");
			add_location(circle0, file$2V, 1, 0, 34);
			attr_dev(line, "x1", "5");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "19");
			attr_dev(line, "y2", "12");
			add_location(line, file$2V, 1, 38, 72);
			attr_dev(circle1, "cx", "12");
			attr_dev(circle1, "cy", "18");
			attr_dev(circle1, "r", "2");
			add_location(circle1, file$2V, 1, 82, 116);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, circle1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(circle1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2W.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2V($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Divide', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Divide> was created with unknown prop '${key}'`);
	});

	return [];
}

class Divide extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2V, create_fragment$2W, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Divide",
			options,
			id: create_fragment$2W.name
		});
	}
}

var Divide$1 = Divide;

/* ../../components/ui/src/icons/feather/DollarSign.svelte generated by Svelte v3.44.2 */

const file$2U = "../../components/ui/src/icons/feather/DollarSign.svelte";

function create_fragment$2V(ctx) {
	let line;
	let path;

	const block = {
		c: function create() {
			line = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "23");
			add_location(line, file$2U, 1, 0, 34);
			attr_dev(path, "d", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6");
			add_location(path, file$2U, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2V.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2U($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('DollarSign', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DollarSign> was created with unknown prop '${key}'`);
	});

	return [];
}

class DollarSign extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2U, create_fragment$2V, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "DollarSign",
			options,
			id: create_fragment$2V.name
		});
	}
}

var DollarSign$1 = DollarSign;

/* ../../components/ui/src/icons/feather/DownloadCloud.svelte generated by Svelte v3.44.2 */

const file$2T = "../../components/ui/src/icons/feather/DownloadCloud.svelte";

function create_fragment$2U(ctx) {
	let polyline;
	let line;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			line = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "8 17 12 21 16 17");
			add_location(polyline, file$2T, 1, 0, 34);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "21");
			add_location(line, file$2T, 1, 47, 81);
			attr_dev(path, "d", "M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29");
			add_location(path, file$2T, 1, 92, 126);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2U.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2T($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('DownloadCloud', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DownloadCloud> was created with unknown prop '${key}'`);
	});

	return [];
}

class DownloadCloud extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2T, create_fragment$2U, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "DownloadCloud",
			options,
			id: create_fragment$2U.name
		});
	}
}

var DownloadCloud$1 = DownloadCloud;

/* ../../components/ui/src/icons/feather/Dribbble.svelte generated by Svelte v3.44.2 */

const file$2S = "../../components/ui/src/icons/feather/Dribbble.svelte";

function create_fragment$2T(ctx) {
	let circle;
	let path;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$2S, 1, 0, 34);
			attr_dev(path, "d", "M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32");
			add_location(path, file$2S, 1, 40, 74);
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
		block,
		id: create_fragment$2T.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2S($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dribbble', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dribbble> was created with unknown prop '${key}'`);
	});

	return [];
}

class Dribbble extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2S, create_fragment$2T, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dribbble",
			options,
			id: create_fragment$2T.name
		});
	}
}

var Dribbble$1 = Dribbble;

/* ../../components/ui/src/icons/feather/Droplet.svelte generated by Svelte v3.44.2 */

const file$2R = "../../components/ui/src/icons/feather/Droplet.svelte";

function create_fragment$2S(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z");
			add_location(path, file$2R, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2S.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2R($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Droplet', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Droplet> was created with unknown prop '${key}'`);
	});

	return [];
}

class Droplet extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2R, create_fragment$2S, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Droplet",
			options,
			id: create_fragment$2S.name
		});
	}
}

var Droplet$1 = Droplet;

/* ../../components/ui/src/icons/feather/Edit2.svelte generated by Svelte v3.44.2 */

const file$2Q = "../../components/ui/src/icons/feather/Edit2.svelte";

function create_fragment$2R(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z");
			add_location(path, file$2Q, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2R.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2Q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Edit2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Edit2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Edit2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2Q, create_fragment$2R, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Edit2",
			options,
			id: create_fragment$2R.name
		});
	}
}

var Edit2$1 = Edit2;

/* ../../components/ui/src/icons/feather/Edit3.svelte generated by Svelte v3.44.2 */

const file$2P = "../../components/ui/src/icons/feather/Edit3.svelte";

function create_fragment$2Q(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M12 20h9");
			add_location(path0, file$2P, 1, 0, 34);
			attr_dev(path1, "d", "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z");
			add_location(path1, file$2P, 1, 26, 60);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2Q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2P($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Edit3', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Edit3> was created with unknown prop '${key}'`);
	});

	return [];
}

class Edit3 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2P, create_fragment$2Q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Edit3",
			options,
			id: create_fragment$2Q.name
		});
	}
}

var Edit3$1 = Edit3;

/* ../../components/ui/src/icons/feather/Edit.svelte generated by Svelte v3.44.2 */

const file$2O = "../../components/ui/src/icons/feather/Edit.svelte";

function create_fragment$2P(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7");
			add_location(path0, file$2O, 1, 0, 34);
			attr_dev(path1, "d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z");
			add_location(path1, file$2O, 1, 76, 110);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2P.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2O($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Edit', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Edit> was created with unknown prop '${key}'`);
	});

	return [];
}

class Edit extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2O, create_fragment$2P, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Edit",
			options,
			id: create_fragment$2P.name
		});
	}
}

var Edit$1 = Edit;

/* ../../components/ui/src/icons/feather/EyeOff.svelte generated by Svelte v3.44.2 */

const file$2N = "../../components/ui/src/icons/feather/EyeOff.svelte";

function create_fragment$2O(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");
			add_location(path, file$2N, 1, 0, 34);
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "23");
			add_location(line, file$2N, 1, 198, 232);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2O.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2N($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('EyeOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EyeOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class EyeOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2N, create_fragment$2O, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "EyeOff",
			options,
			id: create_fragment$2O.name
		});
	}
}

var EyeOff$1 = EyeOff;

/* ../../components/ui/src/icons/feather/Eye.svelte generated by Svelte v3.44.2 */

const file$2M = "../../components/ui/src/icons/feather/Eye.svelte";

function create_fragment$2N(ctx) {
	let path;
	let circle;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z");
			add_location(path, file$2M, 1, 0, 34);
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "3");
			add_location(circle, file$2M, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2N.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2M($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Eye', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Eye> was created with unknown prop '${key}'`);
	});

	return [];
}

class Eye extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2M, create_fragment$2N, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Eye",
			options,
			id: create_fragment$2N.name
		});
	}
}

var Eye$1 = Eye;

/* ../../components/ui/src/icons/feather/Facebook.svelte generated by Svelte v3.44.2 */

const file$2L = "../../components/ui/src/icons/feather/Facebook.svelte";

function create_fragment$2M(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z");
			add_location(path, file$2L, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2M.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2L($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Facebook', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Facebook> was created with unknown prop '${key}'`);
	});

	return [];
}

class Facebook extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2L, create_fragment$2M, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Facebook",
			options,
			id: create_fragment$2M.name
		});
	}
}

var Facebook$1 = Facebook;

/* ../../components/ui/src/icons/feather/FastForward.svelte generated by Svelte v3.44.2 */

const file$2K = "../../components/ui/src/icons/feather/FastForward.svelte";

function create_fragment$2L(ctx) {
	let polygon0;
	let polygon1;

	const block = {
		c: function create() {
			polygon0 = svg_element("polygon");
			polygon1 = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon0 = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon0).forEach(detach_dev);
			polygon1 = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon0, "points", "13 19 22 12 13 5 13 19");
			add_location(polygon0, file$2K, 1, 0, 34);
			attr_dev(polygon1, "points", "2 19 11 12 2 5 2 19");
			add_location(polygon1, file$2K, 1, 51, 85);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon0, anchor);
			insert_hydration_dev(target, polygon1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon0);
			if (detaching) detach_dev(polygon1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2L.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2K($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FastForward', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FastForward> was created with unknown prop '${key}'`);
	});

	return [];
}

class FastForward extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2K, create_fragment$2L, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FastForward",
			options,
			id: create_fragment$2L.name
		});
	}
}

var FastForward$1 = FastForward;

/* ../../components/ui/src/icons/feather/Feather.svelte generated by Svelte v3.44.2 */

const file$2J = "../../components/ui/src/icons/feather/Feather.svelte";

function create_fragment$2K(ctx) {
	let path;
	let line0;
	let line1;

	const block = {
		c: function create() {
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z");
			add_location(path, file$2J, 1, 0, 34);
			attr_dev(line0, "x1", "16");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "2");
			attr_dev(line0, "y2", "22");
			add_location(line0, file$2J, 1, 65, 99);
			attr_dev(line1, "x1", "17.5");
			attr_dev(line1, "y1", "15");
			attr_dev(line1, "x2", "9");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$2J, 1, 108, 142);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2K.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2J($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Feather', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Feather> was created with unknown prop '${key}'`);
	});

	return [];
}

class Feather extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2J, create_fragment$2K, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Feather",
			options,
			id: create_fragment$2K.name
		});
	}
}

var Feather$1 = Feather;

/* ../../components/ui/src/icons/feather/Figma.svelte generated by Svelte v3.44.2 */

const file$2I = "../../components/ui/src/icons/feather/Figma.svelte";

function create_fragment$2J(ctx) {
	let path0;
	let path1;
	let path2;
	let path3;
	let path4;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			path4 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			path2 = claim_svg_element(nodes, "path", { d: true });
			children(path2).forEach(detach_dev);
			path3 = claim_svg_element(nodes, "path", { d: true });
			children(path3).forEach(detach_dev);
			path4 = claim_svg_element(nodes, "path", { d: true });
			children(path4).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z");
			add_location(path0, file$2I, 1, 0, 34);
			attr_dev(path1, "d", "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z");
			add_location(path1, file$2I, 1, 74, 108);
			attr_dev(path2, "d", "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z");
			add_location(path2, file$2I, 1, 125, 159);
			attr_dev(path3, "d", "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z");
			add_location(path3, file$2I, 1, 188, 222);
			attr_dev(path4, "d", "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z");
			add_location(path4, file$2I, 1, 260, 294);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, path2, anchor);
			insert_hydration_dev(target, path3, anchor);
			insert_hydration_dev(target, path4, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(path2);
			if (detaching) detach_dev(path3);
			if (detaching) detach_dev(path4);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2J.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2I($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Figma', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Figma> was created with unknown prop '${key}'`);
	});

	return [];
}

class Figma extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2I, create_fragment$2J, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Figma",
			options,
			id: create_fragment$2J.name
		});
	}
}

var Figma$1 = Figma;

/* ../../components/ui/src/icons/feather/FileMinus.svelte generated by Svelte v3.44.2 */

const file$2H = "../../components/ui/src/icons/feather/FileMinus.svelte";

function create_fragment$2I(ctx) {
	let path;
	let polyline;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z");
			add_location(path, file$2H, 1, 0, 34);
			attr_dev(polyline, "points", "14 2 14 8 20 8");
			add_location(polyline, file$2H, 1, 76, 110);
			attr_dev(line, "x1", "9");
			attr_dev(line, "y1", "15");
			attr_dev(line, "x2", "15");
			attr_dev(line, "y2", "15");
			add_location(line, file$2H, 1, 121, 155);
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
		block,
		id: create_fragment$2I.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2H($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FileMinus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FileMinus> was created with unknown prop '${key}'`);
	});

	return [];
}

class FileMinus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2H, create_fragment$2I, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FileMinus",
			options,
			id: create_fragment$2I.name
		});
	}
}

var FileMinus$1 = FileMinus;

/* ../../components/ui/src/icons/feather/FilePlus.svelte generated by Svelte v3.44.2 */

const file$2G = "../../components/ui/src/icons/feather/FilePlus.svelte";

function create_fragment$2H(ctx) {
	let path;
	let polyline;
	let line0;
	let line1;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z");
			add_location(path, file$2G, 1, 0, 34);
			attr_dev(polyline, "points", "14 2 14 8 20 8");
			add_location(polyline, file$2G, 1, 76, 110);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "18");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$2G, 1, 121, 155);
			attr_dev(line1, "x1", "9");
			attr_dev(line1, "y1", "15");
			attr_dev(line1, "x2", "15");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$2G, 1, 166, 200);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2H.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2G($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FilePlus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FilePlus> was created with unknown prop '${key}'`);
	});

	return [];
}

class FilePlus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2G, create_fragment$2H, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FilePlus",
			options,
			id: create_fragment$2H.name
		});
	}
}

var FilePlus$1 = FilePlus;

/* ../../components/ui/src/icons/feather/FileText.svelte generated by Svelte v3.44.2 */

const file$2F = "../../components/ui/src/icons/feather/FileText.svelte";

function create_fragment$2G(ctx) {
	let path;
	let polyline0;
	let line0;
	let line1;
	let polyline1;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline0 = svg_element("polyline");
			line0 = svg_element("line");
			line1 = svg_element("line");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z");
			add_location(path, file$2F, 1, 0, 34);
			attr_dev(polyline0, "points", "14 2 14 8 20 8");
			add_location(polyline0, file$2F, 1, 76, 110);
			attr_dev(line0, "x1", "16");
			attr_dev(line0, "y1", "13");
			attr_dev(line0, "x2", "8");
			attr_dev(line0, "y2", "13");
			add_location(line0, file$2F, 1, 121, 155);
			attr_dev(line1, "x1", "16");
			attr_dev(line1, "y1", "17");
			attr_dev(line1, "x2", "8");
			attr_dev(line1, "y2", "17");
			add_location(line1, file$2F, 1, 165, 199);
			attr_dev(polyline1, "points", "10 9 9 9 8 9");
			add_location(polyline1, file$2F, 1, 209, 243);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2G.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2F($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FileText', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FileText> was created with unknown prop '${key}'`);
	});

	return [];
}

class FileText extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2F, create_fragment$2G, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FileText",
			options,
			id: create_fragment$2G.name
		});
	}
}

var FileText$1 = FileText;

/* ../../components/ui/src/icons/feather/File.svelte generated by Svelte v3.44.2 */

const file$2E = "../../components/ui/src/icons/feather/File.svelte";

function create_fragment$2F(ctx) {
	let path;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z");
			add_location(path, file$2E, 1, 0, 34);
			attr_dev(polyline, "points", "13 2 13 9 20 9");
			add_location(polyline, file$2E, 1, 76, 110);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2F.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2E($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('File', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<File> was created with unknown prop '${key}'`);
	});

	return [];
}

class File extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2E, create_fragment$2F, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "File",
			options,
			id: create_fragment$2F.name
		});
	}
}

var File$1 = File;

/* ../../components/ui/src/icons/feather/Film.svelte generated by Svelte v3.44.2 */

const file$2D = "../../components/ui/src/icons/feather/Film.svelte";

function create_fragment$2E(ctx) {
	let rect;
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;
	let line6;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			line6 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			line6 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line6).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "2");
			attr_dev(rect, "y", "2");
			attr_dev(rect, "width", "20");
			attr_dev(rect, "height", "20");
			attr_dev(rect, "rx", "2.18");
			attr_dev(rect, "ry", "2.18");
			add_location(rect, file$2D, 1, 0, 34);
			attr_dev(line0, "x1", "7");
			attr_dev(line0, "y1", "2");
			attr_dev(line0, "x2", "7");
			attr_dev(line0, "y2", "22");
			add_location(line0, file$2D, 1, 68, 102);
			attr_dev(line1, "x1", "17");
			attr_dev(line1, "y1", "2");
			attr_dev(line1, "x2", "17");
			attr_dev(line1, "y2", "22");
			add_location(line1, file$2D, 1, 110, 144);
			attr_dev(line2, "x1", "2");
			attr_dev(line2, "y1", "12");
			attr_dev(line2, "x2", "22");
			attr_dev(line2, "y2", "12");
			add_location(line2, file$2D, 1, 154, 188);
			attr_dev(line3, "x1", "2");
			attr_dev(line3, "y1", "7");
			attr_dev(line3, "x2", "7");
			attr_dev(line3, "y2", "7");
			add_location(line3, file$2D, 1, 198, 232);
			attr_dev(line4, "x1", "2");
			attr_dev(line4, "y1", "17");
			attr_dev(line4, "x2", "7");
			attr_dev(line4, "y2", "17");
			add_location(line4, file$2D, 1, 239, 273);
			attr_dev(line5, "x1", "17");
			attr_dev(line5, "y1", "17");
			attr_dev(line5, "x2", "22");
			attr_dev(line5, "y2", "17");
			add_location(line5, file$2D, 1, 282, 316);
			attr_dev(line6, "x1", "17");
			attr_dev(line6, "y1", "7");
			attr_dev(line6, "x2", "22");
			attr_dev(line6, "y2", "7");
			add_location(line6, file$2D, 1, 327, 361);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
			insert_hydration_dev(target, line6, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
			if (detaching) detach_dev(line6);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2E.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2D($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Film', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Film> was created with unknown prop '${key}'`);
	});

	return [];
}

class Film extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2D, create_fragment$2E, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Film",
			options,
			id: create_fragment$2E.name
		});
	}
}

var Film$1 = Film;

/* ../../components/ui/src/icons/feather/Filter.svelte generated by Svelte v3.44.2 */

const file$2C = "../../components/ui/src/icons/feather/Filter.svelte";

function create_fragment$2D(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3");
			add_location(polygon, file$2C, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2D.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2C($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Filter', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Filter> was created with unknown prop '${key}'`);
	});

	return [];
}

class Filter extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2C, create_fragment$2D, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Filter",
			options,
			id: create_fragment$2D.name
		});
	}
}

var Filter$1 = Filter;

/* ../../components/ui/src/icons/feather/Flag.svelte generated by Svelte v3.44.2 */

const file$2B = "../../components/ui/src/icons/feather/Flag.svelte";

function create_fragment$2C(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z");
			add_location(path, file$2B, 1, 0, 34);
			attr_dev(line, "x1", "4");
			attr_dev(line, "y1", "22");
			attr_dev(line, "x2", "4");
			attr_dev(line, "y2", "15");
			add_location(line, file$2B, 1, 75, 109);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2C.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2B($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Flag', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Flag> was created with unknown prop '${key}'`);
	});

	return [];
}

class Flag extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2B, create_fragment$2C, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Flag",
			options,
			id: create_fragment$2C.name
		});
	}
}

var Flag$1 = Flag;

/* ../../components/ui/src/icons/feather/FolderMinus.svelte generated by Svelte v3.44.2 */

const file$2A = "../../components/ui/src/icons/feather/FolderMinus.svelte";

function create_fragment$2B(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z");
			add_location(path, file$2A, 1, 0, 34);
			attr_dev(line, "x1", "9");
			attr_dev(line, "y1", "14");
			attr_dev(line, "x2", "15");
			attr_dev(line, "y2", "14");
			add_location(line, file$2A, 1, 93, 127);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2B.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2A($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FolderMinus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FolderMinus> was created with unknown prop '${key}'`);
	});

	return [];
}

class FolderMinus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2A, create_fragment$2B, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FolderMinus",
			options,
			id: create_fragment$2B.name
		});
	}
}

var FolderMinus$1 = FolderMinus;

/* ../../components/ui/src/icons/feather/FolderPlus.svelte generated by Svelte v3.44.2 */

const file$2z = "../../components/ui/src/icons/feather/FolderPlus.svelte";

function create_fragment$2A(ctx) {
	let path;
	let line0;
	let line1;

	const block = {
		c: function create() {
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z");
			add_location(path, file$2z, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "11");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "17");
			add_location(line0, file$2z, 1, 93, 127);
			attr_dev(line1, "x1", "9");
			attr_dev(line1, "y1", "14");
			attr_dev(line1, "x2", "15");
			attr_dev(line1, "y2", "14");
			add_location(line1, file$2z, 1, 138, 172);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2A.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FolderPlus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FolderPlus> was created with unknown prop '${key}'`);
	});

	return [];
}

class FolderPlus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2z, create_fragment$2A, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FolderPlus",
			options,
			id: create_fragment$2A.name
		});
	}
}

var FolderPlus$1 = FolderPlus;

/* ../../components/ui/src/icons/feather/Folder.svelte generated by Svelte v3.44.2 */

const file$2y = "../../components/ui/src/icons/feather/Folder.svelte";

function create_fragment$2z(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z");
			add_location(path, file$2y, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Folder', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Folder> was created with unknown prop '${key}'`);
	});

	return [];
}

class Folder extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2y, create_fragment$2z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Folder",
			options,
			id: create_fragment$2z.name
		});
	}
}

var Folder$1 = Folder;

/* ../../components/ui/src/icons/feather/Framer.svelte generated by Svelte v3.44.2 */

const file$2x = "../../components/ui/src/icons/feather/Framer.svelte";

function create_fragment$2y(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7");
			add_location(path, file$2x, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2x($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Framer', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Framer> was created with unknown prop '${key}'`);
	});

	return [];
}

class Framer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2x, create_fragment$2y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Framer",
			options,
			id: create_fragment$2y.name
		});
	}
}

var Framer$1 = Framer;

/* ../../components/ui/src/icons/feather/Frown.svelte generated by Svelte v3.44.2 */

const file$2w = "../../components/ui/src/icons/feather/Frown.svelte";

function create_fragment$2x(ctx) {
	let circle;
	let path;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$2w, 1, 0, 34);
			attr_dev(path, "d", "M16 16s-1.5-2-4-2-4 2-4 2");
			add_location(path, file$2w, 1, 40, 74);
			attr_dev(line0, "x1", "9");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "9.01");
			attr_dev(line0, "y2", "9");
			add_location(line0, file$2w, 1, 83, 117);
			attr_dev(line1, "x1", "15");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "15.01");
			attr_dev(line1, "y2", "9");
			add_location(line1, file$2w, 1, 127, 161);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2x.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2w($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Frown', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Frown> was created with unknown prop '${key}'`);
	});

	return [];
}

class Frown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2w, create_fragment$2x, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Frown",
			options,
			id: create_fragment$2x.name
		});
	}
}

var Frown$1 = Frown;

/* ../../components/ui/src/icons/feather/Gift.svelte generated by Svelte v3.44.2 */

const file$2v = "../../components/ui/src/icons/feather/Gift.svelte";

function create_fragment$2w(ctx) {
	let polyline;
	let rect;
	let line;
	let path0;
	let path1;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			rect = svg_element("rect");
			line = svg_element("line");
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);

			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "20 12 20 22 4 22 4 12");
			add_location(polyline, file$2v, 1, 0, 34);
			attr_dev(rect, "x", "2");
			attr_dev(rect, "y", "7");
			attr_dev(rect, "width", "20");
			attr_dev(rect, "height", "5");
			add_location(rect, file$2v, 1, 52, 86);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "22");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "7");
			add_location(line, file$2v, 1, 99, 133);
			attr_dev(path0, "d", "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z");
			add_location(path0, file$2v, 1, 143, 177);
			attr_dev(path1, "d", "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z");
			add_location(path1, file$2v, 1, 204, 238);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2w.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2v($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Gift', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Gift> was created with unknown prop '${key}'`);
	});

	return [];
}

class Gift extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2v, create_fragment$2w, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Gift",
			options,
			id: create_fragment$2w.name
		});
	}
}

var Gift$1 = Gift;

/* ../../components/ui/src/icons/feather/GitBranch.svelte generated by Svelte v3.44.2 */

const file$2u = "../../components/ui/src/icons/feather/GitBranch.svelte";

function create_fragment$2v(ctx) {
	let line;
	let circle0;
	let circle1;
	let path;

	const block = {
		c: function create() {
			line = svg_element("line");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "6");
			attr_dev(line, "y1", "3");
			attr_dev(line, "x2", "6");
			attr_dev(line, "y2", "15");
			add_location(line, file$2u, 1, 0, 34);
			attr_dev(circle0, "cx", "18");
			attr_dev(circle0, "cy", "6");
			attr_dev(circle0, "r", "3");
			add_location(circle0, file$2u, 1, 42, 76);
			attr_dev(circle1, "cx", "6");
			attr_dev(circle1, "cy", "18");
			attr_dev(circle1, "r", "3");
			add_location(circle1, file$2u, 1, 80, 114);
			attr_dev(path, "d", "M18 9a9 9 0 0 1-9 9");
			add_location(path, file$2u, 1, 118, 152);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2v.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2u($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('GitBranch', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GitBranch> was created with unknown prop '${key}'`);
	});

	return [];
}

class GitBranch extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2u, create_fragment$2v, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "GitBranch",
			options,
			id: create_fragment$2v.name
		});
	}
}

var GitBranch$1 = GitBranch;

/* ../../components/ui/src/icons/feather/GitCommit.svelte generated by Svelte v3.44.2 */

const file$2t = "../../components/ui/src/icons/feather/GitCommit.svelte";

function create_fragment$2u(ctx) {
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "4");
			add_location(circle, file$2t, 1, 0, 34);
			attr_dev(line0, "x1", "1.05");
			attr_dev(line0, "y1", "12");
			attr_dev(line0, "x2", "7");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$2t, 1, 39, 73);
			attr_dev(line1, "x1", "17.01");
			attr_dev(line1, "y1", "12");
			attr_dev(line1, "x2", "22.96");
			attr_dev(line1, "y2", "12");
			add_location(line1, file$2t, 1, 85, 119);
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
		block,
		id: create_fragment$2u.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2t($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('GitCommit', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GitCommit> was created with unknown prop '${key}'`);
	});

	return [];
}

class GitCommit extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2t, create_fragment$2u, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "GitCommit",
			options,
			id: create_fragment$2u.name
		});
	}
}

var GitCommit$1 = GitCommit;

/* ../../components/ui/src/icons/feather/GitMerge.svelte generated by Svelte v3.44.2 */

const file$2s = "../../components/ui/src/icons/feather/GitMerge.svelte";

function create_fragment$2t(ctx) {
	let circle0;
	let circle1;
	let path;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "18");
			attr_dev(circle0, "cy", "18");
			attr_dev(circle0, "r", "3");
			add_location(circle0, file$2s, 1, 0, 34);
			attr_dev(circle1, "cx", "6");
			attr_dev(circle1, "cy", "6");
			attr_dev(circle1, "r", "3");
			add_location(circle1, file$2s, 1, 39, 73);
			attr_dev(path, "d", "M6 21V9a9 9 0 0 0 9 9");
			add_location(path, file$2s, 1, 76, 110);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2t.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2s($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('GitMerge', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GitMerge> was created with unknown prop '${key}'`);
	});

	return [];
}

class GitMerge extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2s, create_fragment$2t, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "GitMerge",
			options,
			id: create_fragment$2t.name
		});
	}
}

var GitMerge$1 = GitMerge;

/* ../../components/ui/src/icons/feather/GitPullRequest.svelte generated by Svelte v3.44.2 */

const file$2r = "../../components/ui/src/icons/feather/GitPullRequest.svelte";

function create_fragment$2s(ctx) {
	let circle0;
	let circle1;
	let path;
	let line;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "18");
			attr_dev(circle0, "cy", "18");
			attr_dev(circle0, "r", "3");
			add_location(circle0, file$2r, 1, 0, 34);
			attr_dev(circle1, "cx", "6");
			attr_dev(circle1, "cy", "6");
			attr_dev(circle1, "r", "3");
			add_location(circle1, file$2r, 1, 39, 73);
			attr_dev(path, "d", "M13 6h3a2 2 0 0 1 2 2v7");
			add_location(path, file$2r, 1, 76, 110);
			attr_dev(line, "x1", "6");
			attr_dev(line, "y1", "9");
			attr_dev(line, "x2", "6");
			attr_dev(line, "y2", "21");
			add_location(line, file$2r, 1, 117, 151);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2s.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2r($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('GitPullRequest', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GitPullRequest> was created with unknown prop '${key}'`);
	});

	return [];
}

class GitPullRequest extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2r, create_fragment$2s, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "GitPullRequest",
			options,
			id: create_fragment$2s.name
		});
	}
}

var GitPullRequest$1 = GitPullRequest;

/* ../../components/ui/src/icons/feather/Github.svelte generated by Svelte v3.44.2 */

const file$2q = "../../components/ui/src/icons/feather/Github.svelte";

function create_fragment$2r(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22");
			add_location(path, file$2q, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2r.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Github', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Github> was created with unknown prop '${key}'`);
	});

	return [];
}

class Github extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2q, create_fragment$2r, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Github",
			options,
			id: create_fragment$2r.name
		});
	}
}

var Github$1 = Github;

/* ../../components/ui/src/icons/feather/Gitlab.svelte generated by Svelte v3.44.2 */

const file$2p = "../../components/ui/src/icons/feather/Gitlab.svelte";

function create_fragment$2q(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z");
			add_location(path, file$2p, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2p($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Gitlab', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Gitlab> was created with unknown prop '${key}'`);
	});

	return [];
}

class Gitlab extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2p, create_fragment$2q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Gitlab",
			options,
			id: create_fragment$2q.name
		});
	}
}

var Gitlab$1 = Gitlab;

/* ../../components/ui/src/icons/feather/Grid.svelte generated by Svelte v3.44.2 */

const file$2o = "../../components/ui/src/icons/feather/Grid.svelte";

function create_fragment$2p(ctx) {
	let rect0;
	let rect1;
	let rect2;
	let rect3;

	const block = {
		c: function create() {
			rect0 = svg_element("rect");
			rect1 = svg_element("rect");
			rect2 = svg_element("rect");
			rect3 = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect0 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect0).forEach(detach_dev);

			rect1 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect1).forEach(detach_dev);

			rect2 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect2).forEach(detach_dev);

			rect3 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect3).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect0, "x", "3");
			attr_dev(rect0, "y", "3");
			attr_dev(rect0, "width", "7");
			attr_dev(rect0, "height", "7");
			add_location(rect0, file$2o, 1, 0, 34);
			attr_dev(rect1, "x", "14");
			attr_dev(rect1, "y", "3");
			attr_dev(rect1, "width", "7");
			attr_dev(rect1, "height", "7");
			add_location(rect1, file$2o, 1, 46, 80);
			attr_dev(rect2, "x", "14");
			attr_dev(rect2, "y", "14");
			attr_dev(rect2, "width", "7");
			attr_dev(rect2, "height", "7");
			add_location(rect2, file$2o, 1, 93, 127);
			attr_dev(rect3, "x", "3");
			attr_dev(rect3, "y", "14");
			attr_dev(rect3, "width", "7");
			attr_dev(rect3, "height", "7");
			add_location(rect3, file$2o, 1, 141, 175);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect0, anchor);
			insert_hydration_dev(target, rect1, anchor);
			insert_hydration_dev(target, rect2, anchor);
			insert_hydration_dev(target, rect3, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect0);
			if (detaching) detach_dev(rect1);
			if (detaching) detach_dev(rect2);
			if (detaching) detach_dev(rect3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2p.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2o($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Grid', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Grid> was created with unknown prop '${key}'`);
	});

	return [];
}

class Grid extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2o, create_fragment$2p, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Grid",
			options,
			id: create_fragment$2p.name
		});
	}
}

var Grid$1 = Grid;

/* ../../components/ui/src/icons/feather/HardDrive.svelte generated by Svelte v3.44.2 */

const file$2n = "../../components/ui/src/icons/feather/HardDrive.svelte";

function create_fragment$2o(ctx) {
	let line0;
	let path;
	let line1;
	let line2;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			path = svg_element("path");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "22");
			attr_dev(line0, "y1", "12");
			attr_dev(line0, "x2", "2");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$2n, 1, 0, 34);
			attr_dev(path, "d", "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z");
			add_location(path, file$2n, 1, 44, 78);
			attr_dev(line1, "x1", "6");
			attr_dev(line1, "y1", "16");
			attr_dev(line1, "x2", "6.01");
			attr_dev(line1, "y2", "16");
			add_location(line1, file$2n, 1, 168, 202);
			attr_dev(line2, "x1", "10");
			attr_dev(line2, "y1", "16");
			attr_dev(line2, "x2", "10.01");
			attr_dev(line2, "y2", "16");
			add_location(line2, file$2n, 1, 214, 248);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2o.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2n($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('HardDrive', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HardDrive> was created with unknown prop '${key}'`);
	});

	return [];
}

class HardDrive extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2n, create_fragment$2o, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HardDrive",
			options,
			id: create_fragment$2o.name
		});
	}
}

var HardDrive$1 = HardDrive;

/* ../../components/ui/src/icons/feather/Hash.svelte generated by Svelte v3.44.2 */

const file$2m = "../../components/ui/src/icons/feather/Hash.svelte";

function create_fragment$2n(ctx) {
	let line0;
	let line1;
	let line2;
	let line3;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "4");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "20");
			attr_dev(line0, "y2", "9");
			add_location(line0, file$2m, 1, 0, 34);
			attr_dev(line1, "x1", "4");
			attr_dev(line1, "y1", "15");
			attr_dev(line1, "x2", "20");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$2m, 1, 42, 76);
			attr_dev(line2, "x1", "10");
			attr_dev(line2, "y1", "3");
			attr_dev(line2, "x2", "8");
			attr_dev(line2, "y2", "21");
			add_location(line2, file$2m, 1, 86, 120);
			attr_dev(line3, "x1", "16");
			attr_dev(line3, "y1", "3");
			attr_dev(line3, "x2", "14");
			attr_dev(line3, "y2", "21");
			add_location(line3, file$2m, 1, 129, 163);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2m($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Hash', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hash> was created with unknown prop '${key}'`);
	});

	return [];
}

class Hash extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2m, create_fragment$2n, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Hash",
			options,
			id: create_fragment$2n.name
		});
	}
}

var Hash$1 = Hash;

/* ../../components/ui/src/icons/feather/Headphones.svelte generated by Svelte v3.44.2 */

const file$2l = "../../components/ui/src/icons/feather/Headphones.svelte";

function create_fragment$2m(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M3 18v-6a9 9 0 0 1 18 0v6");
			add_location(path0, file$2l, 1, 0, 34);
			attr_dev(path1, "d", "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z");
			add_location(path1, file$2l, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2l($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Headphones', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Headphones> was created with unknown prop '${key}'`);
	});

	return [];
}

class Headphones extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2l, create_fragment$2m, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Headphones",
			options,
			id: create_fragment$2m.name
		});
	}
}

var Headphones$1 = Headphones;

/* ../../components/ui/src/icons/feather/Heart.svelte generated by Svelte v3.44.2 */

const file$2k = "../../components/ui/src/icons/feather/Heart.svelte";

function create_fragment$2l(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z");
			add_location(path, file$2k, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2k($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Heart', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Heart> was created with unknown prop '${key}'`);
	});

	return [];
}

class Heart extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2k, create_fragment$2l, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Heart",
			options,
			id: create_fragment$2l.name
		});
	}
}

var Heart$1 = Heart;

/* ../../components/ui/src/icons/feather/HelpCircle.svelte generated by Svelte v3.44.2 */

const file$2j = "../../components/ui/src/icons/feather/HelpCircle.svelte";

function create_fragment$2k(ctx) {
	let circle;
	let path;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$2j, 1, 0, 34);
			attr_dev(path, "d", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3");
			add_location(path, file$2j, 1, 40, 74);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "17");
			attr_dev(line, "x2", "12.01");
			attr_dev(line, "y2", "17");
			add_location(line, file$2j, 1, 94, 128);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2j($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('HelpCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HelpCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class HelpCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2j, create_fragment$2k, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HelpCircle",
			options,
			id: create_fragment$2k.name
		});
	}
}

var HelpCircle$1 = HelpCircle;

/* ../../components/ui/src/icons/feather/Hexagon.svelte generated by Svelte v3.44.2 */

const file$2i = "../../components/ui/src/icons/feather/Hexagon.svelte";

function create_fragment$2j(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z");
			add_location(path, file$2i, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2i($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Hexagon', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hexagon> was created with unknown prop '${key}'`);
	});

	return [];
}

class Hexagon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2i, create_fragment$2j, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Hexagon",
			options,
			id: create_fragment$2j.name
		});
	}
}

var Hexagon$1 = Hexagon;

/* ../../components/ui/src/icons/feather/Home.svelte generated by Svelte v3.44.2 */

const file$2h = "../../components/ui/src/icons/feather/Home.svelte";

function create_fragment$2i(ctx) {
	let path;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z");
			add_location(path, file$2h, 1, 0, 34);
			attr_dev(polyline, "points", "9 22 9 12 15 12 15 22");
			add_location(polyline, file$2h, 1, 64, 98);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2h($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Home', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
	});

	return [];
}

class Home extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2h, create_fragment$2i, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Home",
			options,
			id: create_fragment$2i.name
		});
	}
}

var Home$1 = Home;

/* ../../components/ui/src/icons/feather/Image.svelte generated by Svelte v3.44.2 */

const file$2g = "../../components/ui/src/icons/feather/Image.svelte";

function create_fragment$2h(ctx) {
	let rect;
	let circle;
	let polyline;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$2g, 1, 0, 34);
			attr_dev(circle, "cx", "8.5");
			attr_dev(circle, "cy", "8.5");
			attr_dev(circle, "r", "1.5");
			add_location(circle, file$2g, 1, 62, 96);
			attr_dev(polyline, "points", "21 15 16 10 5 21");
			add_location(polyline, file$2g, 1, 105, 139);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2g($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Image', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Image> was created with unknown prop '${key}'`);
	});

	return [];
}

class Image extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2g, create_fragment$2h, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Image",
			options,
			id: create_fragment$2h.name
		});
	}
}

var Image$1 = Image;

/* ../../components/ui/src/icons/feather/Inbox.svelte generated by Svelte v3.44.2 */

const file$2f = "../../components/ui/src/icons/feather/Inbox.svelte";

function create_fragment$2g(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "22 12 16 12 14 15 10 15 8 12 2 12");
			add_location(polyline, file$2f, 1, 0, 34);
			attr_dev(path, "d", "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z");
			add_location(path, file$2f, 1, 64, 98);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2f($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Inbox', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Inbox> was created with unknown prop '${key}'`);
	});

	return [];
}

class Inbox extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2f, create_fragment$2g, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Inbox",
			options,
			id: create_fragment$2g.name
		});
	}
}

var Inbox$1 = Inbox;

/* ../../components/ui/src/icons/feather/Instagram.svelte generated by Svelte v3.44.2 */

const file$2e = "../../components/ui/src/icons/feather/Instagram.svelte";

function create_fragment$2f(ctx) {
	let rect;
	let path;
	let line;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "2");
			attr_dev(rect, "y", "2");
			attr_dev(rect, "width", "20");
			attr_dev(rect, "height", "20");
			attr_dev(rect, "rx", "5");
			attr_dev(rect, "ry", "5");
			add_location(rect, file$2e, 1, 0, 34);
			attr_dev(path, "d", "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z");
			add_location(path, file$2e, 1, 62, 96);
			attr_dev(line, "x1", "17.5");
			attr_dev(line, "y1", "6.5");
			attr_dev(line, "x2", "17.51");
			attr_dev(line, "y2", "6.5");
			add_location(line, file$2e, 1, 127, 161);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2e($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Instagram', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Instagram> was created with unknown prop '${key}'`);
	});

	return [];
}

class Instagram extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2e, create_fragment$2f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Instagram",
			options,
			id: create_fragment$2f.name
		});
	}
}

var Instagram$1 = Instagram;

/* ../../components/ui/src/icons/feather/Italic.svelte generated by Svelte v3.44.2 */

const file$2d = "../../components/ui/src/icons/feather/Italic.svelte";

function create_fragment$2e(ctx) {
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "19");
			attr_dev(line0, "y1", "4");
			attr_dev(line0, "x2", "10");
			attr_dev(line0, "y2", "4");
			add_location(line0, file$2d, 1, 0, 34);
			attr_dev(line1, "x1", "14");
			attr_dev(line1, "y1", "20");
			attr_dev(line1, "x2", "5");
			attr_dev(line1, "y2", "20");
			add_location(line1, file$2d, 1, 43, 77);
			attr_dev(line2, "x1", "15");
			attr_dev(line2, "y1", "4");
			attr_dev(line2, "x2", "9");
			attr_dev(line2, "y2", "20");
			add_location(line2, file$2d, 1, 87, 121);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2d($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Italic', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Italic> was created with unknown prop '${key}'`);
	});

	return [];
}

class Italic extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2d, create_fragment$2e, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Italic",
			options,
			id: create_fragment$2e.name
		});
	}
}

var Italic$1 = Italic;

/* ../../components/ui/src/icons/feather/Key.svelte generated by Svelte v3.44.2 */

const file$2c = "../../components/ui/src/icons/feather/Key.svelte";

function create_fragment$2d(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4");
			add_location(path, file$2c, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2c($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Key', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Key> was created with unknown prop '${key}'`);
	});

	return [];
}

class Key extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2c, create_fragment$2d, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Key",
			options,
			id: create_fragment$2d.name
		});
	}
}

var Key$1 = Key;

/* ../../components/ui/src/icons/feather/Layers.svelte generated by Svelte v3.44.2 */

const file$2b = "../../components/ui/src/icons/feather/Layers.svelte";

function create_fragment$2c(ctx) {
	let polygon;
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "12 2 2 7 12 12 22 7 12 2");
			add_location(polygon, file$2b, 1, 0, 34);
			attr_dev(polyline0, "points", "2 17 12 22 22 17");
			add_location(polyline0, file$2b, 1, 53, 87);
			attr_dev(polyline1, "points", "2 12 12 17 22 12");
			add_location(polyline1, file$2b, 1, 100, 134);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2b($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Layers', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layers> was created with unknown prop '${key}'`);
	});

	return [];
}

class Layers extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2b, create_fragment$2c, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layers",
			options,
			id: create_fragment$2c.name
		});
	}
}

var Layers$1 = Layers;

/* ../../components/ui/src/icons/feather/Layout.svelte generated by Svelte v3.44.2 */

const file$2a = "../../components/ui/src/icons/feather/Layout.svelte";

function create_fragment$2b(ctx) {
	let rect;
	let line0;
	let line1;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$2a, 1, 0, 34);
			attr_dev(line0, "x1", "3");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "21");
			attr_dev(line0, "y2", "9");
			add_location(line0, file$2a, 1, 62, 96);
			attr_dev(line1, "x1", "9");
			attr_dev(line1, "y1", "21");
			attr_dev(line1, "x2", "9");
			attr_dev(line1, "y2", "9");
			add_location(line1, file$2a, 1, 104, 138);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2a($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Layout', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	return [];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2a, create_fragment$2b, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$2b.name
		});
	}
}

var Layout$1 = Layout;

/* ../../components/ui/src/icons/feather/LifeBuoy.svelte generated by Svelte v3.44.2 */

const file$29 = "../../components/ui/src/icons/feather/LifeBuoy.svelte";

function create_fragment$2a(ctx) {
	let circle0;
	let circle1;
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "12");
			attr_dev(circle0, "r", "10");
			add_location(circle0, file$29, 1, 0, 34);
			attr_dev(circle1, "cx", "12");
			attr_dev(circle1, "cy", "12");
			attr_dev(circle1, "r", "4");
			add_location(circle1, file$29, 1, 40, 74);
			attr_dev(line0, "x1", "4.93");
			attr_dev(line0, "y1", "4.93");
			attr_dev(line0, "x2", "9.17");
			attr_dev(line0, "y2", "9.17");
			add_location(line0, file$29, 1, 79, 113);
			attr_dev(line1, "x1", "14.83");
			attr_dev(line1, "y1", "14.83");
			attr_dev(line1, "x2", "19.07");
			attr_dev(line1, "y2", "19.07");
			add_location(line1, file$29, 1, 132, 166);
			attr_dev(line2, "x1", "14.83");
			attr_dev(line2, "y1", "9.17");
			attr_dev(line2, "x2", "19.07");
			attr_dev(line2, "y2", "4.93");
			add_location(line2, file$29, 1, 189, 223);
			attr_dev(line3, "x1", "14.83");
			attr_dev(line3, "y1", "9.17");
			attr_dev(line3, "x2", "18.36");
			attr_dev(line3, "y2", "5.64");
			add_location(line3, file$29, 1, 244, 278);
			attr_dev(line4, "x1", "4.93");
			attr_dev(line4, "y1", "19.07");
			attr_dev(line4, "x2", "9.17");
			attr_dev(line4, "y2", "14.83");
			add_location(line4, file$29, 1, 299, 333);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$29($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('LifeBuoy', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LifeBuoy> was created with unknown prop '${key}'`);
	});

	return [];
}

class LifeBuoy extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$29, create_fragment$2a, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "LifeBuoy",
			options,
			id: create_fragment$2a.name
		});
	}
}

var LifeBuoy$1 = LifeBuoy;

/* ../../components/ui/src/icons/feather/Link2.svelte generated by Svelte v3.44.2 */

const file$28 = "../../components/ui/src/icons/feather/Link2.svelte";

function create_fragment$29(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3");
			add_location(path, file$28, 1, 0, 34);
			attr_dev(line, "x1", "8");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "16");
			attr_dev(line, "y2", "12");
			add_location(line, file$28, 1, 93, 127);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$29.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$28($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Link2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Link2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Link2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$28, create_fragment$29, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Link2",
			options,
			id: create_fragment$29.name
		});
	}
}

var Link2$1 = Link2;

/* ../../components/ui/src/icons/feather/Linkedin.svelte generated by Svelte v3.44.2 */

const file$27 = "../../components/ui/src/icons/feather/Linkedin.svelte";

function create_fragment$28(ctx) {
	let path;
	let rect;
	let circle;

	const block = {
		c: function create() {
			path = svg_element("path");
			rect = svg_element("rect");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);

			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z");
			add_location(path, file$27, 1, 0, 34);
			attr_dev(rect, "x", "2");
			attr_dev(rect, "y", "9");
			attr_dev(rect, "width", "4");
			attr_dev(rect, "height", "12");
			add_location(rect, file$27, 1, 96, 130);
			attr_dev(circle, "cx", "4");
			attr_dev(circle, "cy", "4");
			attr_dev(circle, "r", "2");
			add_location(circle, file$27, 1, 143, 177);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$28.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$27($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Linkedin', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Linkedin> was created with unknown prop '${key}'`);
	});

	return [];
}

class Linkedin extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$27, create_fragment$28, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Linkedin",
			options,
			id: create_fragment$28.name
		});
	}
}

var Linkedin$1 = Linkedin;

/* ../../components/ui/src/icons/feather/Lock.svelte generated by Svelte v3.44.2 */

const file$26 = "../../components/ui/src/icons/feather/Lock.svelte";

function create_fragment$27(ctx) {
	let rect;
	let path;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "11");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "11");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$26, 1, 0, 34);
			attr_dev(path, "d", "M7 11V7a5 5 0 0 1 10 0v4");
			add_location(path, file$26, 1, 63, 97);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$27.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$26($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Lock', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Lock> was created with unknown prop '${key}'`);
	});

	return [];
}

class Lock extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$26, create_fragment$27, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Lock",
			options,
			id: create_fragment$27.name
		});
	}
}

var Lock$1 = Lock;

/* ../../components/ui/src/icons/feather/LogIn.svelte generated by Svelte v3.44.2 */

const file$25 = "../../components/ui/src/icons/feather/LogIn.svelte";

function create_fragment$26(ctx) {
	let path;
	let polyline;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4");
			add_location(path, file$25, 1, 0, 34);
			attr_dev(polyline, "points", "10 17 15 12 10 7");
			add_location(polyline, file$25, 1, 59, 93);
			attr_dev(line, "x1", "15");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "3");
			attr_dev(line, "y2", "12");
			add_location(line, file$25, 1, 106, 140);
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
		block,
		id: create_fragment$26.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$25($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('LogIn', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LogIn> was created with unknown prop '${key}'`);
	});

	return [];
}

class LogIn extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$25, create_fragment$26, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "LogIn",
			options,
			id: create_fragment$26.name
		});
	}
}

var LogIn$1 = LogIn;

/* ../../components/ui/src/icons/feather/LogOut.svelte generated by Svelte v3.44.2 */

const file$24 = "../../components/ui/src/icons/feather/LogOut.svelte";

function create_fragment$25(ctx) {
	let path;
	let polyline;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4");
			add_location(path, file$24, 1, 0, 34);
			attr_dev(polyline, "points", "16 17 21 12 16 7");
			add_location(polyline, file$24, 1, 57, 91);
			attr_dev(line, "x1", "21");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "9");
			attr_dev(line, "y2", "12");
			add_location(line, file$24, 1, 104, 138);
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
		block,
		id: create_fragment$25.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$24($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('LogOut', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LogOut> was created with unknown prop '${key}'`);
	});

	return [];
}

class LogOut extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$24, create_fragment$25, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "LogOut",
			options,
			id: create_fragment$25.name
		});
	}
}

var LogOut$1 = LogOut;

/* ../../components/ui/src/icons/feather/Mail.svelte generated by Svelte v3.44.2 */

const file$23 = "../../components/ui/src/icons/feather/Mail.svelte";

function create_fragment$24(ctx) {
	let path;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z");
			add_location(path, file$23, 1, 0, 34);
			attr_dev(polyline, "points", "22,6 12,13 2,6");
			add_location(polyline, file$23, 1, 93, 127);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$24.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$23($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Mail', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mail> was created with unknown prop '${key}'`);
	});

	return [];
}

class Mail extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$23, create_fragment$24, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Mail",
			options,
			id: create_fragment$24.name
		});
	}
}

var Mail$1 = Mail;

/* ../../components/ui/src/icons/feather/Map.svelte generated by Svelte v3.44.2 */

const file$22 = "../../components/ui/src/icons/feather/Map.svelte";

function create_fragment$23(ctx) {
	let polygon;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6");
			add_location(polygon, file$22, 1, 0, 34);
			attr_dev(line0, "x1", "8");
			attr_dev(line0, "y1", "2");
			attr_dev(line0, "x2", "8");
			attr_dev(line0, "y2", "18");
			add_location(line0, file$22, 1, 72, 106);
			attr_dev(line1, "x1", "16");
			attr_dev(line1, "y1", "6");
			attr_dev(line1, "x2", "16");
			attr_dev(line1, "y2", "22");
			add_location(line1, file$22, 1, 114, 148);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$23.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$22($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Map', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Map> was created with unknown prop '${key}'`);
	});

	return [];
}

class Map extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$22, create_fragment$23, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Map",
			options,
			id: create_fragment$23.name
		});
	}
}

var Map$1 = Map;

/* ../../components/ui/src/icons/feather/Maximize2.svelte generated by Svelte v3.44.2 */

const file$21 = "../../components/ui/src/icons/feather/Maximize2.svelte";

function create_fragment$22(ctx) {
	let polyline0;
	let polyline1;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "15 3 21 3 21 9");
			add_location(polyline0, file$21, 1, 0, 34);
			attr_dev(polyline1, "points", "9 21 3 21 3 15");
			add_location(polyline1, file$21, 1, 45, 79);
			attr_dev(line0, "x1", "21");
			attr_dev(line0, "y1", "3");
			attr_dev(line0, "x2", "14");
			attr_dev(line0, "y2", "10");
			add_location(line0, file$21, 1, 90, 124);
			attr_dev(line1, "x1", "3");
			attr_dev(line1, "y1", "21");
			attr_dev(line1, "x2", "10");
			attr_dev(line1, "y2", "14");
			add_location(line1, file$21, 1, 134, 168);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$22.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$21($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Maximize2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Maximize2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Maximize2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$21, create_fragment$22, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Maximize2",
			options,
			id: create_fragment$22.name
		});
	}
}

var Maximize2$1 = Maximize2;

/* ../../components/ui/src/icons/feather/Maximize.svelte generated by Svelte v3.44.2 */

const file$20 = "../../components/ui/src/icons/feather/Maximize.svelte";

function create_fragment$21(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3");
			add_location(path, file$20, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$21.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$20($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Maximize', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Maximize> was created with unknown prop '${key}'`);
	});

	return [];
}

class Maximize extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$20, create_fragment$21, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Maximize",
			options,
			id: create_fragment$21.name
		});
	}
}

var Maximize$1 = Maximize;

/* ../../components/ui/src/icons/feather/Meh.svelte generated by Svelte v3.44.2 */

const file$1$ = "../../components/ui/src/icons/feather/Meh.svelte";

function create_fragment$20(ctx) {
	let circle;
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$1$, 1, 0, 34);
			attr_dev(line0, "x1", "8");
			attr_dev(line0, "y1", "15");
			attr_dev(line0, "x2", "16");
			attr_dev(line0, "y2", "15");
			add_location(line0, file$1$, 1, 40, 74);
			attr_dev(line1, "x1", "9");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "9.01");
			attr_dev(line1, "y2", "9");
			add_location(line1, file$1$, 1, 84, 118);
			attr_dev(line2, "x1", "15");
			attr_dev(line2, "y1", "9");
			attr_dev(line2, "x2", "15.01");
			attr_dev(line2, "y2", "9");
			add_location(line2, file$1$, 1, 128, 162);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$20.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1$($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Meh', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Meh> was created with unknown prop '${key}'`);
	});

	return [];
}

class Meh extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1$, create_fragment$20, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Meh",
			options,
			id: create_fragment$20.name
		});
	}
}

var Meh$1 = Meh;

/* ../../components/ui/src/icons/feather/Menu.svelte generated by Svelte v3.44.2 */

const file$1_ = "../../components/ui/src/icons/feather/Menu.svelte";

function create_fragment$1$(ctx) {
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "3");
			attr_dev(line0, "y1", "12");
			attr_dev(line0, "x2", "21");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$1_, 1, 0, 34);
			attr_dev(line1, "x1", "3");
			attr_dev(line1, "y1", "6");
			attr_dev(line1, "x2", "21");
			attr_dev(line1, "y2", "6");
			add_location(line1, file$1_, 1, 44, 78);
			attr_dev(line2, "x1", "3");
			attr_dev(line2, "y1", "18");
			attr_dev(line2, "x2", "21");
			attr_dev(line2, "y2", "18");
			add_location(line2, file$1_, 1, 86, 120);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1$.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1_($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Menu', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
	});

	return [];
}

class Menu extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1_, create_fragment$1$, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Menu",
			options,
			id: create_fragment$1$.name
		});
	}
}

var Menu$1 = Menu;

/* ../../components/ui/src/icons/feather/MessageCircle.svelte generated by Svelte v3.44.2 */

const file$1Z = "../../components/ui/src/icons/feather/MessageCircle.svelte";

function create_fragment$1_(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z");
			add_location(path, file$1Z, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1_.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1Z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MessageCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MessageCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class MessageCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1Z, create_fragment$1_, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MessageCircle",
			options,
			id: create_fragment$1_.name
		});
	}
}

var MessageCircle$1 = MessageCircle;

/* ../../components/ui/src/icons/feather/MessageSquare.svelte generated by Svelte v3.44.2 */

const file$1Y = "../../components/ui/src/icons/feather/MessageSquare.svelte";

function create_fragment$1Z(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z");
			add_location(path, file$1Y, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1Z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1Y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MessageSquare', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MessageSquare> was created with unknown prop '${key}'`);
	});

	return [];
}

class MessageSquare extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1Y, create_fragment$1Z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MessageSquare",
			options,
			id: create_fragment$1Z.name
		});
	}
}

var MessageSquare$1 = MessageSquare;

/* ../../components/ui/src/icons/feather/MicOff.svelte generated by Svelte v3.44.2 */

const file$1X = "../../components/ui/src/icons/feather/MicOff.svelte";

function create_fragment$1Y(ctx) {
	let line0;
	let path0;
	let path1;
	let line1;
	let line2;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			path0 = svg_element("path");
			path1 = svg_element("path");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "1");
			attr_dev(line0, "y1", "1");
			attr_dev(line0, "x2", "23");
			attr_dev(line0, "y2", "23");
			add_location(line0, file$1X, 1, 0, 34);
			attr_dev(path0, "d", "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6");
			add_location(path0, file$1X, 1, 43, 77);
			attr_dev(path1, "d", "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23");
			add_location(path1, file$1X, 1, 115, 149);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "19");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "23");
			add_location(line1, file$1X, 1, 186, 220);
			attr_dev(line2, "x1", "8");
			attr_dev(line2, "y1", "23");
			attr_dev(line2, "x2", "16");
			attr_dev(line2, "y2", "23");
			add_location(line2, file$1X, 1, 231, 265);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1Y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1X($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MicOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MicOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class MicOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1X, create_fragment$1Y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MicOff",
			options,
			id: create_fragment$1Y.name
		});
	}
}

var MicOff$1 = MicOff;

/* ../../components/ui/src/icons/feather/Mic.svelte generated by Svelte v3.44.2 */

const file$1W = "../../components/ui/src/icons/feather/Mic.svelte";

function create_fragment$1X(ctx) {
	let path0;
	let path1;
	let line0;
	let line1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z");
			add_location(path0, file$1W, 1, 0, 34);
			attr_dev(path1, "d", "M19 10v2a7 7 0 0 1-14 0v-2");
			add_location(path1, file$1W, 1, 70, 104);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "19");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "23");
			add_location(line0, file$1W, 1, 114, 148);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "23");
			attr_dev(line1, "x2", "16");
			attr_dev(line1, "y2", "23");
			add_location(line1, file$1W, 1, 159, 193);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1X.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1W($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Mic', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mic> was created with unknown prop '${key}'`);
	});

	return [];
}

class Mic extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1W, create_fragment$1X, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Mic",
			options,
			id: create_fragment$1X.name
		});
	}
}

var Mic$1 = Mic;

/* ../../components/ui/src/icons/feather/Minimize2.svelte generated by Svelte v3.44.2 */

const file$1V = "../../components/ui/src/icons/feather/Minimize2.svelte";

function create_fragment$1W(ctx) {
	let polyline0;
	let polyline1;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "4 14 10 14 10 20");
			add_location(polyline0, file$1V, 1, 0, 34);
			attr_dev(polyline1, "points", "20 10 14 10 14 4");
			add_location(polyline1, file$1V, 1, 47, 81);
			attr_dev(line0, "x1", "14");
			attr_dev(line0, "y1", "10");
			attr_dev(line0, "x2", "21");
			attr_dev(line0, "y2", "3");
			add_location(line0, file$1V, 1, 94, 128);
			attr_dev(line1, "x1", "3");
			attr_dev(line1, "y1", "21");
			attr_dev(line1, "x2", "10");
			attr_dev(line1, "y2", "14");
			add_location(line1, file$1V, 1, 138, 172);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1W.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1V($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Minimize2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Minimize2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Minimize2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1V, create_fragment$1W, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Minimize2",
			options,
			id: create_fragment$1W.name
		});
	}
}

var Minimize2$1 = Minimize2;

/* ../../components/ui/src/icons/feather/Minimize.svelte generated by Svelte v3.44.2 */

const file$1U = "../../components/ui/src/icons/feather/Minimize.svelte";

function create_fragment$1V(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3");
			add_location(path, file$1U, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1V.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1U($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Minimize', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Minimize> was created with unknown prop '${key}'`);
	});

	return [];
}

class Minimize extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1U, create_fragment$1V, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Minimize",
			options,
			id: create_fragment$1V.name
		});
	}
}

var Minimize$1 = Minimize;

/* ../../components/ui/src/icons/feather/Minus.svelte generated by Svelte v3.44.2 */

const file$1T = "../../components/ui/src/icons/feather/Minus.svelte";

function create_fragment$1U(ctx) {
	let line;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "5");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "19");
			attr_dev(line, "y2", "12");
			add_location(line, file$1T, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1U.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1T($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Minus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Minus> was created with unknown prop '${key}'`);
	});

	return [];
}

class Minus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1T, create_fragment$1U, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Minus",
			options,
			id: create_fragment$1U.name
		});
	}
}

var Minus$1 = Minus;

/* ../../components/ui/src/icons/feather/Monitor.svelte generated by Svelte v3.44.2 */

const file$1S = "../../components/ui/src/icons/feather/Monitor.svelte";

function create_fragment$1T(ctx) {
	let rect;
	let line0;
	let line1;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "2");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "20");
			attr_dev(rect, "height", "14");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$1S, 1, 0, 34);
			attr_dev(line0, "x1", "8");
			attr_dev(line0, "y1", "21");
			attr_dev(line0, "x2", "16");
			attr_dev(line0, "y2", "21");
			add_location(line0, file$1S, 1, 62, 96);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "17");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "21");
			add_location(line1, file$1S, 1, 106, 140);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1T.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1S($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Monitor', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Monitor> was created with unknown prop '${key}'`);
	});

	return [];
}

class Monitor extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1S, create_fragment$1T, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Monitor",
			options,
			id: create_fragment$1T.name
		});
	}
}

var Monitor$1 = Monitor;

/* ../../components/ui/src/icons/feather/Moon.svelte generated by Svelte v3.44.2 */

const file$1R = "../../components/ui/src/icons/feather/Moon.svelte";

function create_fragment$1S(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z");
			add_location(path, file$1R, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1S.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1R($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Moon', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Moon> was created with unknown prop '${key}'`);
	});

	return [];
}

class Moon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1R, create_fragment$1S, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Moon",
			options,
			id: create_fragment$1S.name
		});
	}
}

var Moon$1 = Moon;

/* ../../components/ui/src/icons/feather/MoreHorizontal.svelte generated by Svelte v3.44.2 */

const file$1Q = "../../components/ui/src/icons/feather/MoreHorizontal.svelte";

function create_fragment$1R(ctx) {
	let circle0;
	let circle1;
	let circle2;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			circle2 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			circle2 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "12");
			attr_dev(circle0, "r", "1");
			add_location(circle0, file$1Q, 1, 0, 34);
			attr_dev(circle1, "cx", "19");
			attr_dev(circle1, "cy", "12");
			attr_dev(circle1, "r", "1");
			add_location(circle1, file$1Q, 1, 39, 73);
			attr_dev(circle2, "cx", "5");
			attr_dev(circle2, "cy", "12");
			attr_dev(circle2, "r", "1");
			add_location(circle2, file$1Q, 1, 78, 112);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, circle2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(circle2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1R.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1Q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MoreHorizontal', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MoreHorizontal> was created with unknown prop '${key}'`);
	});

	return [];
}

class MoreHorizontal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1Q, create_fragment$1R, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MoreHorizontal",
			options,
			id: create_fragment$1R.name
		});
	}
}

var MoreHorizontal$1 = MoreHorizontal;

/* ../../components/ui/src/icons/feather/MoreVertical.svelte generated by Svelte v3.44.2 */

const file$1P = "../../components/ui/src/icons/feather/MoreVertical.svelte";

function create_fragment$1Q(ctx) {
	let circle0;
	let circle1;
	let circle2;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			circle2 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			circle2 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "12");
			attr_dev(circle0, "r", "1");
			add_location(circle0, file$1P, 1, 0, 34);
			attr_dev(circle1, "cx", "12");
			attr_dev(circle1, "cy", "5");
			attr_dev(circle1, "r", "1");
			add_location(circle1, file$1P, 1, 39, 73);
			attr_dev(circle2, "cx", "12");
			attr_dev(circle2, "cy", "19");
			attr_dev(circle2, "r", "1");
			add_location(circle2, file$1P, 1, 77, 111);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, circle2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(circle2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1Q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1P($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MoreVertical', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MoreVertical> was created with unknown prop '${key}'`);
	});

	return [];
}

class MoreVertical extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1P, create_fragment$1Q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MoreVertical",
			options,
			id: create_fragment$1Q.name
		});
	}
}

var MoreVertical$1 = MoreVertical;

/* ../../components/ui/src/icons/feather/MousePointer.svelte generated by Svelte v3.44.2 */

const file$1O = "../../components/ui/src/icons/feather/MousePointer.svelte";

function create_fragment$1P(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z");
			add_location(path0, file$1O, 1, 0, 34);
			attr_dev(path1, "d", "M13 13l6 6");
			add_location(path1, file$1O, 1, 58, 92);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1P.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1O($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MousePointer', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MousePointer> was created with unknown prop '${key}'`);
	});

	return [];
}

class MousePointer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1O, create_fragment$1P, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MousePointer",
			options,
			id: create_fragment$1P.name
		});
	}
}

var MousePointer$1 = MousePointer;

/* ../../components/ui/src/icons/feather/Move.svelte generated by Svelte v3.44.2 */

const file$1N = "../../components/ui/src/icons/feather/Move.svelte";

function create_fragment$1O(ctx) {
	let polyline0;
	let polyline1;
	let polyline2;
	let polyline3;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			polyline2 = svg_element("polyline");
			polyline3 = svg_element("polyline");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			polyline2 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline2).forEach(detach_dev);
			polyline3 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline3).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "5 9 2 12 5 15");
			add_location(polyline0, file$1N, 1, 0, 34);
			attr_dev(polyline1, "points", "9 5 12 2 15 5");
			add_location(polyline1, file$1N, 1, 44, 78);
			attr_dev(polyline2, "points", "15 19 12 22 9 19");
			add_location(polyline2, file$1N, 1, 88, 122);
			attr_dev(polyline3, "points", "19 9 22 12 19 15");
			add_location(polyline3, file$1N, 1, 135, 169);
			attr_dev(line0, "x1", "2");
			attr_dev(line0, "y1", "12");
			attr_dev(line0, "x2", "22");
			attr_dev(line0, "y2", "12");
			add_location(line0, file$1N, 1, 182, 216);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "2");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "22");
			add_location(line1, file$1N, 1, 226, 260);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, polyline2, anchor);
			insert_hydration_dev(target, polyline3, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(polyline2);
			if (detaching) detach_dev(polyline3);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1O.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1N($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Move', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Move> was created with unknown prop '${key}'`);
	});

	return [];
}

class Move extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1N, create_fragment$1O, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Move",
			options,
			id: create_fragment$1O.name
		});
	}
}

var Move$1 = Move;

/* ../../components/ui/src/icons/feather/Music.svelte generated by Svelte v3.44.2 */

const file$1M = "../../components/ui/src/icons/feather/Music.svelte";

function create_fragment$1N(ctx) {
	let path;
	let circle0;
	let circle1;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M9 18V5l12-2v13");
			add_location(path, file$1M, 1, 0, 34);
			attr_dev(circle0, "cx", "6");
			attr_dev(circle0, "cy", "18");
			attr_dev(circle0, "r", "3");
			add_location(circle0, file$1M, 1, 33, 67);
			attr_dev(circle1, "cx", "18");
			attr_dev(circle1, "cy", "16");
			attr_dev(circle1, "r", "3");
			add_location(circle1, file$1M, 1, 71, 105);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1N.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1M($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Music', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Music> was created with unknown prop '${key}'`);
	});

	return [];
}

class Music extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1M, create_fragment$1N, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Music",
			options,
			id: create_fragment$1N.name
		});
	}
}

var Music$1 = Music;

/* ../../components/ui/src/icons/feather/Navigation2.svelte generated by Svelte v3.44.2 */

const file$1L = "../../components/ui/src/icons/feather/Navigation2.svelte";

function create_fragment$1M(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "12 2 19 21 12 17 5 21 12 2");
			add_location(polygon, file$1L, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1M.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1L($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Navigation2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navigation2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Navigation2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1L, create_fragment$1M, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Navigation2",
			options,
			id: create_fragment$1M.name
		});
	}
}

var Navigation2$1 = Navigation2;

/* ../../components/ui/src/icons/feather/Navigation.svelte generated by Svelte v3.44.2 */

const file$1K = "../../components/ui/src/icons/feather/Navigation.svelte";

function create_fragment$1L(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "3 11 22 2 13 21 11 13 3 11");
			add_location(polygon, file$1K, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1L.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1K($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Navigation', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navigation> was created with unknown prop '${key}'`);
	});

	return [];
}

class Navigation extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1K, create_fragment$1L, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Navigation",
			options,
			id: create_fragment$1L.name
		});
	}
}

var Navigation$1 = Navigation;

/* ../../components/ui/src/icons/feather/Octagon.svelte generated by Svelte v3.44.2 */

const file$1J = "../../components/ui/src/icons/feather/Octagon.svelte";

function create_fragment$1K(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2");
			add_location(polygon, file$1J, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1K.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1J($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Octagon', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Octagon> was created with unknown prop '${key}'`);
	});

	return [];
}

class Octagon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1J, create_fragment$1K, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Octagon",
			options,
			id: create_fragment$1K.name
		});
	}
}

var Octagon$1 = Octagon;

/* ../../components/ui/src/icons/feather/Package.svelte generated by Svelte v3.44.2 */

const file$1I = "../../components/ui/src/icons/feather/Package.svelte";

function create_fragment$1J(ctx) {
	let line0;
	let path;
	let polyline;
	let line1;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			path = svg_element("path");
			polyline = svg_element("polyline");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "16.5");
			attr_dev(line0, "y1", "9.4");
			attr_dev(line0, "x2", "7.5");
			attr_dev(line0, "y2", "4.21");
			add_location(line0, file$1I, 1, 0, 34);
			attr_dev(path, "d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z");
			add_location(path, file$1I, 1, 51, 85);
			attr_dev(polyline, "points", "3.27 6.96 12 12.01 20.73 6.96");
			add_location(polyline, file$1I, 1, 190, 224);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "22.08");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "12");
			add_location(line1, file$1I, 1, 250, 284);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1J.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1I($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Package', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Package> was created with unknown prop '${key}'`);
	});

	return [];
}

class Package extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1I, create_fragment$1J, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Package",
			options,
			id: create_fragment$1J.name
		});
	}
}

var Package$1 = Package;

/* ../../components/ui/src/icons/feather/Paperclip.svelte generated by Svelte v3.44.2 */

const file$1H = "../../components/ui/src/icons/feather/Paperclip.svelte";

function create_fragment$1I(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48");
			add_location(path, file$1H, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1I.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1H($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Paperclip', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Paperclip> was created with unknown prop '${key}'`);
	});

	return [];
}

class Paperclip extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1H, create_fragment$1I, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Paperclip",
			options,
			id: create_fragment$1I.name
		});
	}
}

var Paperclip$1 = Paperclip;

/* ../../components/ui/src/icons/feather/PauseCircle.svelte generated by Svelte v3.44.2 */

const file$1G = "../../components/ui/src/icons/feather/PauseCircle.svelte";

function create_fragment$1H(ctx) {
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$1G, 1, 0, 34);
			attr_dev(line0, "x1", "10");
			attr_dev(line0, "y1", "15");
			attr_dev(line0, "x2", "10");
			attr_dev(line0, "y2", "9");
			add_location(line0, file$1G, 1, 40, 74);
			attr_dev(line1, "x1", "14");
			attr_dev(line1, "y1", "15");
			attr_dev(line1, "x2", "14");
			attr_dev(line1, "y2", "9");
			add_location(line1, file$1G, 1, 84, 118);
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
		block,
		id: create_fragment$1H.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1G($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PauseCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PauseCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class PauseCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1G, create_fragment$1H, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PauseCircle",
			options,
			id: create_fragment$1H.name
		});
	}
}

var PauseCircle$1 = PauseCircle;

/* ../../components/ui/src/icons/feather/Pause.svelte generated by Svelte v3.44.2 */

const file$1F = "../../components/ui/src/icons/feather/Pause.svelte";

function create_fragment$1G(ctx) {
	let rect0;
	let rect1;

	const block = {
		c: function create() {
			rect0 = svg_element("rect");
			rect1 = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect0 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect0).forEach(detach_dev);

			rect1 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect0, "x", "6");
			attr_dev(rect0, "y", "4");
			attr_dev(rect0, "width", "4");
			attr_dev(rect0, "height", "16");
			add_location(rect0, file$1F, 1, 0, 34);
			attr_dev(rect1, "x", "14");
			attr_dev(rect1, "y", "4");
			attr_dev(rect1, "width", "4");
			attr_dev(rect1, "height", "16");
			add_location(rect1, file$1F, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect0, anchor);
			insert_hydration_dev(target, rect1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect0);
			if (detaching) detach_dev(rect1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1G.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1F($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Pause', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Pause> was created with unknown prop '${key}'`);
	});

	return [];
}

class Pause extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1F, create_fragment$1G, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Pause",
			options,
			id: create_fragment$1G.name
		});
	}
}

var Pause$1 = Pause;

/* ../../components/ui/src/icons/feather/PenTool.svelte generated by Svelte v3.44.2 */

const file$1E = "../../components/ui/src/icons/feather/PenTool.svelte";

function create_fragment$1F(ctx) {
	let path0;
	let path1;
	let path2;
	let circle;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			path2 = claim_svg_element(nodes, "path", { d: true });
			children(path2).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M12 19l7-7 3 3-7 7-3-3z");
			add_location(path0, file$1E, 1, 0, 34);
			attr_dev(path1, "d", "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z");
			add_location(path1, file$1E, 1, 41, 75);
			attr_dev(path2, "d", "M2 2l7.586 7.586");
			add_location(path2, file$1E, 1, 98, 132);
			attr_dev(circle, "cx", "11");
			attr_dev(circle, "cy", "11");
			attr_dev(circle, "r", "2");
			add_location(circle, file$1E, 1, 132, 166);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, path2, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(path2);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1F.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1E($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PenTool', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PenTool> was created with unknown prop '${key}'`);
	});

	return [];
}

class PenTool extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1E, create_fragment$1F, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PenTool",
			options,
			id: create_fragment$1F.name
		});
	}
}

var PenTool$1 = PenTool;

/* ../../components/ui/src/icons/feather/Percent.svelte generated by Svelte v3.44.2 */

const file$1D = "../../components/ui/src/icons/feather/Percent.svelte";

function create_fragment$1E(ctx) {
	let line;
	let circle0;
	let circle1;

	const block = {
		c: function create() {
			line = svg_element("line");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "19");
			attr_dev(line, "y1", "5");
			attr_dev(line, "x2", "5");
			attr_dev(line, "y2", "19");
			add_location(line, file$1D, 1, 0, 34);
			attr_dev(circle0, "cx", "6.5");
			attr_dev(circle0, "cy", "6.5");
			attr_dev(circle0, "r", "2.5");
			add_location(circle0, file$1D, 1, 43, 77);
			attr_dev(circle1, "cx", "17.5");
			attr_dev(circle1, "cy", "17.5");
			attr_dev(circle1, "r", "2.5");
			add_location(circle1, file$1D, 1, 86, 120);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1E.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1D($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Percent', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Percent> was created with unknown prop '${key}'`);
	});

	return [];
}

class Percent extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1D, create_fragment$1E, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Percent",
			options,
			id: create_fragment$1E.name
		});
	}
}

var Percent$1 = Percent;

/* ../../components/ui/src/icons/feather/PhoneCall.svelte generated by Svelte v3.44.2 */

const file$1C = "../../components/ui/src/icons/feather/PhoneCall.svelte";

function create_fragment$1D(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
			add_location(path, file$1C, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1D.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1C($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PhoneCall', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PhoneCall> was created with unknown prop '${key}'`);
	});

	return [];
}

class PhoneCall extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1C, create_fragment$1D, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PhoneCall",
			options,
			id: create_fragment$1D.name
		});
	}
}

var PhoneCall$1 = PhoneCall;

/* ../../components/ui/src/icons/feather/PhoneForwarded.svelte generated by Svelte v3.44.2 */

const file$1B = "../../components/ui/src/icons/feather/PhoneForwarded.svelte";

function create_fragment$1C(ctx) {
	let polyline;
	let line;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			line = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "19 1 23 5 19 9");
			add_location(polyline, file$1B, 1, 0, 34);
			attr_dev(line, "x1", "15");
			attr_dev(line, "y1", "5");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "5");
			add_location(line, file$1B, 1, 45, 79);
			attr_dev(path, "d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
			add_location(path, file$1B, 1, 88, 122);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1C.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1B($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PhoneForwarded', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PhoneForwarded> was created with unknown prop '${key}'`);
	});

	return [];
}

class PhoneForwarded extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1B, create_fragment$1C, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PhoneForwarded",
			options,
			id: create_fragment$1C.name
		});
	}
}

var PhoneForwarded$1 = PhoneForwarded;

/* ../../components/ui/src/icons/feather/PhoneIncoming.svelte generated by Svelte v3.44.2 */

const file$1A = "../../components/ui/src/icons/feather/PhoneIncoming.svelte";

function create_fragment$1B(ctx) {
	let polyline;
	let line;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			line = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "16 2 16 8 22 8");
			add_location(polyline, file$1A, 1, 0, 34);
			attr_dev(line, "x1", "23");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "16");
			attr_dev(line, "y2", "8");
			add_location(line, file$1A, 1, 45, 79);
			attr_dev(path, "d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
			add_location(path, file$1A, 1, 88, 122);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1B.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1A($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PhoneIncoming', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PhoneIncoming> was created with unknown prop '${key}'`);
	});

	return [];
}

class PhoneIncoming extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1A, create_fragment$1B, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PhoneIncoming",
			options,
			id: create_fragment$1B.name
		});
	}
}

var PhoneIncoming$1 = PhoneIncoming;

/* ../../components/ui/src/icons/feather/PhoneMissed.svelte generated by Svelte v3.44.2 */

const file$1z = "../../components/ui/src/icons/feather/PhoneMissed.svelte";

function create_fragment$1A(ctx) {
	let line0;
	let line1;
	let path;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "23");
			attr_dev(line0, "y1", "1");
			attr_dev(line0, "x2", "17");
			attr_dev(line0, "y2", "7");
			add_location(line0, file$1z, 1, 0, 34);
			attr_dev(line1, "x1", "17");
			attr_dev(line1, "y1", "1");
			attr_dev(line1, "x2", "23");
			attr_dev(line1, "y2", "7");
			add_location(line1, file$1z, 1, 43, 77);
			attr_dev(path, "d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
			add_location(path, file$1z, 1, 86, 120);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1A.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PhoneMissed', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PhoneMissed> was created with unknown prop '${key}'`);
	});

	return [];
}

class PhoneMissed extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1z, create_fragment$1A, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PhoneMissed",
			options,
			id: create_fragment$1A.name
		});
	}
}

var PhoneMissed$1 = PhoneMissed;

/* ../../components/ui/src/icons/feather/PhoneOff.svelte generated by Svelte v3.44.2 */

const file$1y = "../../components/ui/src/icons/feather/PhoneOff.svelte";

function create_fragment$1z(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91");
			add_location(path, file$1y, 1, 0, 34);
			attr_dev(line, "x1", "23");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "1");
			attr_dev(line, "y2", "23");
			add_location(line, file$1y, 1, 327, 361);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PhoneOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PhoneOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class PhoneOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1y, create_fragment$1z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PhoneOff",
			options,
			id: create_fragment$1z.name
		});
	}
}

var PhoneOff$1 = PhoneOff;

/* ../../components/ui/src/icons/feather/PhoneOutgoing.svelte generated by Svelte v3.44.2 */

const file$1x = "../../components/ui/src/icons/feather/PhoneOutgoing.svelte";

function create_fragment$1y(ctx) {
	let polyline;
	let line;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			line = svg_element("line");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "23 7 23 1 17 1");
			add_location(polyline, file$1x, 1, 0, 34);
			attr_dev(line, "x1", "16");
			attr_dev(line, "y1", "8");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "1");
			add_location(line, file$1x, 1, 45, 79);
			attr_dev(path, "d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
			add_location(path, file$1x, 1, 88, 122);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1x($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PhoneOutgoing', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PhoneOutgoing> was created with unknown prop '${key}'`);
	});

	return [];
}

class PhoneOutgoing extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1x, create_fragment$1y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PhoneOutgoing",
			options,
			id: create_fragment$1y.name
		});
	}
}

var PhoneOutgoing$1 = PhoneOutgoing;

/* ../../components/ui/src/icons/feather/Phone.svelte generated by Svelte v3.44.2 */

const file$1w = "../../components/ui/src/icons/feather/Phone.svelte";

function create_fragment$1x(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
			add_location(path, file$1w, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1x.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1w($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Phone', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Phone> was created with unknown prop '${key}'`);
	});

	return [];
}

class Phone extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1w, create_fragment$1x, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Phone",
			options,
			id: create_fragment$1x.name
		});
	}
}

var Phone$1 = Phone;

/* ../../components/ui/src/icons/feather/PieChart.svelte generated by Svelte v3.44.2 */

const file$1v = "../../components/ui/src/icons/feather/PieChart.svelte";

function create_fragment$1w(ctx) {
	let path0;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M21.21 15.89A10 10 0 1 1 8 2.83");
			add_location(path0, file$1v, 1, 0, 34);
			attr_dev(path1, "d", "M22 12A10 10 0 0 0 12 2v10z");
			add_location(path1, file$1v, 1, 49, 83);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1w.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1v($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PieChart', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PieChart> was created with unknown prop '${key}'`);
	});

	return [];
}

class PieChart extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1v, create_fragment$1w, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PieChart",
			options,
			id: create_fragment$1w.name
		});
	}
}

var PieChart$1 = PieChart;

/* ../../components/ui/src/icons/feather/PlayCircle.svelte generated by Svelte v3.44.2 */

const file$1u = "../../components/ui/src/icons/feather/PlayCircle.svelte";

function create_fragment$1v(ctx) {
	let circle;
	let polygon;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$1u, 1, 0, 34);
			attr_dev(polygon, "points", "10 8 16 12 10 16 10 8");
			add_location(polygon, file$1u, 1, 40, 74);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1v.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1u($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PlayCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PlayCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class PlayCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1u, create_fragment$1v, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PlayCircle",
			options,
			id: create_fragment$1v.name
		});
	}
}

var PlayCircle$1 = PlayCircle;

/* ../../components/ui/src/icons/feather/Play.svelte generated by Svelte v3.44.2 */

const file$1t = "../../components/ui/src/icons/feather/Play.svelte";

function create_fragment$1u(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "5 3 19 12 5 21 5 3");
			add_location(polygon, file$1t, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1u.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1t($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Play', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Play> was created with unknown prop '${key}'`);
	});

	return [];
}

class Play extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1t, create_fragment$1u, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Play",
			options,
			id: create_fragment$1u.name
		});
	}
}

var Play$1 = Play;

/* ../../components/ui/src/icons/feather/PlusSquare.svelte generated by Svelte v3.44.2 */

const file$1s = "../../components/ui/src/icons/feather/PlusSquare.svelte";

function create_fragment$1t(ctx) {
	let rect;
	let line0;
	let line1;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$1s, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "16");
			add_location(line0, file$1s, 1, 62, 96);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "12");
			attr_dev(line1, "x2", "16");
			attr_dev(line1, "y2", "12");
			add_location(line1, file$1s, 1, 106, 140);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1t.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1s($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PlusSquare', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PlusSquare> was created with unknown prop '${key}'`);
	});

	return [];
}

class PlusSquare extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1s, create_fragment$1t, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PlusSquare",
			options,
			id: create_fragment$1t.name
		});
	}
}

var PlusSquare$1 = PlusSquare;

/* ../../components/ui/src/icons/feather/Plus.svelte generated by Svelte v3.44.2 */

const file$1r = "../../components/ui/src/icons/feather/Plus.svelte";

function create_fragment$1s(ctx) {
	let line0;
	let line1;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "5");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "19");
			add_location(line0, file$1r, 1, 0, 34);
			attr_dev(line1, "x1", "5");
			attr_dev(line1, "y1", "12");
			attr_dev(line1, "x2", "19");
			attr_dev(line1, "y2", "12");
			add_location(line1, file$1r, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1s.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1r($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Plus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Plus> was created with unknown prop '${key}'`);
	});

	return [];
}

class Plus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1r, create_fragment$1s, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Plus",
			options,
			id: create_fragment$1s.name
		});
	}
}

var Plus$1 = Plus;

/* ../../components/ui/src/icons/feather/Pocket.svelte generated by Svelte v3.44.2 */

const file$1q = "../../components/ui/src/icons/feather/Pocket.svelte";

function create_fragment$1r(ctx) {
	let path;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z");
			add_location(path, file$1q, 1, 0, 34);
			attr_dev(polyline, "points", "8 10 12 14 16 10");
			add_location(polyline, file$1q, 1, 93, 127);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1r.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Pocket', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Pocket> was created with unknown prop '${key}'`);
	});

	return [];
}

class Pocket extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1q, create_fragment$1r, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Pocket",
			options,
			id: create_fragment$1r.name
		});
	}
}

var Pocket$1 = Pocket;

/* ../../components/ui/src/icons/feather/Power.svelte generated by Svelte v3.44.2 */

const file$1p = "../../components/ui/src/icons/feather/Power.svelte";

function create_fragment$1q(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M18.36 6.64a9 9 0 1 1-12.73 0");
			add_location(path, file$1p, 1, 0, 34);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "2");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "12");
			add_location(line, file$1p, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1p($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Power', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Power> was created with unknown prop '${key}'`);
	});

	return [];
}

class Power extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1p, create_fragment$1q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Power",
			options,
			id: create_fragment$1q.name
		});
	}
}

var Power$1 = Power;

/* ../../components/ui/src/icons/feather/Printer.svelte generated by Svelte v3.44.2 */

const file$1o = "../../components/ui/src/icons/feather/Printer.svelte";

function create_fragment$1p(ctx) {
	let polyline;
	let path;
	let rect;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);

			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "6 9 6 2 18 2 18 9");
			add_location(polyline, file$1o, 1, 0, 34);
			attr_dev(path, "d", "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2");
			add_location(path, file$1o, 1, 48, 82);
			attr_dev(rect, "x", "6");
			attr_dev(rect, "y", "14");
			attr_dev(rect, "width", "12");
			attr_dev(rect, "height", "8");
			add_location(rect, file$1o, 1, 140, 174);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, rect, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1p.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1o($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Printer', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Printer> was created with unknown prop '${key}'`);
	});

	return [];
}

class Printer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1o, create_fragment$1p, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Printer",
			options,
			id: create_fragment$1p.name
		});
	}
}

var Printer$1 = Printer;

/* ../../components/ui/src/icons/feather/Radio.svelte generated by Svelte v3.44.2 */

const file$1n = "../../components/ui/src/icons/feather/Radio.svelte";

function create_fragment$1o(ctx) {
	let circle;
	let path;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "2");
			add_location(circle, file$1n, 1, 0, 34);
			attr_dev(path, "d", "M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14");
			add_location(path, file$1n, 1, 39, 73);
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
		block,
		id: create_fragment$1o.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1n($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Radio', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Radio> was created with unknown prop '${key}'`);
	});

	return [];
}

class Radio extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1n, create_fragment$1o, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Radio",
			options,
			id: create_fragment$1o.name
		});
	}
}

var Radio$1 = Radio;

/* ../../components/ui/src/icons/feather/RefreshCcw.svelte generated by Svelte v3.44.2 */

const file$1m = "../../components/ui/src/icons/feather/RefreshCcw.svelte";

function create_fragment$1n(ctx) {
	let polyline0;
	let polyline1;
	let path;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "1 4 1 10 7 10");
			add_location(polyline0, file$1m, 1, 0, 34);
			attr_dev(polyline1, "points", "23 20 23 14 17 14");
			add_location(polyline1, file$1m, 1, 44, 78);
			attr_dev(path, "d", "M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15");
			add_location(path, file$1m, 1, 92, 126);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1m($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('RefreshCcw', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RefreshCcw> was created with unknown prop '${key}'`);
	});

	return [];
}

class RefreshCcw extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1m, create_fragment$1n, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "RefreshCcw",
			options,
			id: create_fragment$1n.name
		});
	}
}

var RefreshCcw$1 = RefreshCcw;

/* ../../components/ui/src/icons/feather/RefreshCw.svelte generated by Svelte v3.44.2 */

const file$1l = "../../components/ui/src/icons/feather/RefreshCw.svelte";

function create_fragment$1m(ctx) {
	let polyline0;
	let polyline1;
	let path;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "23 4 23 10 17 10");
			add_location(polyline0, file$1l, 1, 0, 34);
			attr_dev(polyline1, "points", "1 20 1 14 7 14");
			add_location(polyline1, file$1l, 1, 47, 81);
			attr_dev(path, "d", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15");
			add_location(path, file$1l, 1, 92, 126);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1l($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('RefreshCw', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RefreshCw> was created with unknown prop '${key}'`);
	});

	return [];
}

class RefreshCw extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1l, create_fragment$1m, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "RefreshCw",
			options,
			id: create_fragment$1m.name
		});
	}
}

var RefreshCw$1 = RefreshCw;

/* ../../components/ui/src/icons/feather/Repeat.svelte generated by Svelte v3.44.2 */

const file$1k = "../../components/ui/src/icons/feather/Repeat.svelte";

function create_fragment$1l(ctx) {
	let polyline0;
	let path0;
	let polyline1;
	let path1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			path0 = svg_element("path");
			polyline1 = svg_element("polyline");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "17 1 21 5 17 9");
			add_location(polyline0, file$1k, 1, 0, 34);
			attr_dev(path0, "d", "M3 11V9a4 4 0 0 1 4-4h14");
			add_location(path0, file$1k, 1, 45, 79);
			attr_dev(polyline1, "points", "7 23 3 19 7 15");
			add_location(polyline1, file$1k, 1, 87, 121);
			attr_dev(path1, "d", "M21 13v2a4 4 0 0 1-4 4H3");
			add_location(path1, file$1k, 1, 132, 166);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1k($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Repeat', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Repeat> was created with unknown prop '${key}'`);
	});

	return [];
}

class Repeat extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1k, create_fragment$1l, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Repeat",
			options,
			id: create_fragment$1l.name
		});
	}
}

var Repeat$1 = Repeat;

/* ../../components/ui/src/icons/feather/Rewind.svelte generated by Svelte v3.44.2 */

const file$1j = "../../components/ui/src/icons/feather/Rewind.svelte";

function create_fragment$1k(ctx) {
	let polygon0;
	let polygon1;

	const block = {
		c: function create() {
			polygon0 = svg_element("polygon");
			polygon1 = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon0 = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon0).forEach(detach_dev);
			polygon1 = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon0, "points", "11 19 2 12 11 5 11 19");
			add_location(polygon0, file$1j, 1, 0, 34);
			attr_dev(polygon1, "points", "22 19 13 12 22 5 22 19");
			add_location(polygon1, file$1j, 1, 50, 84);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon0, anchor);
			insert_hydration_dev(target, polygon1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon0);
			if (detaching) detach_dev(polygon1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1j($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Rewind', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rewind> was created with unknown prop '${key}'`);
	});

	return [];
}

class Rewind extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1j, create_fragment$1k, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Rewind",
			options,
			id: create_fragment$1k.name
		});
	}
}

var Rewind$1 = Rewind;

/* ../../components/ui/src/icons/feather/RotateCcw.svelte generated by Svelte v3.44.2 */

const file$1i = "../../components/ui/src/icons/feather/RotateCcw.svelte";

function create_fragment$1j(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "1 4 1 10 7 10");
			add_location(polyline, file$1i, 1, 0, 34);
			attr_dev(path, "d", "M3.51 15a9 9 0 1 0 2.13-9.36L1 10");
			add_location(path, file$1i, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1i($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('RotateCcw', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RotateCcw> was created with unknown prop '${key}'`);
	});

	return [];
}

class RotateCcw extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1i, create_fragment$1j, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "RotateCcw",
			options,
			id: create_fragment$1j.name
		});
	}
}

var RotateCcw$1 = RotateCcw;

/* ../../components/ui/src/icons/feather/RotateCw.svelte generated by Svelte v3.44.2 */

const file$1h = "../../components/ui/src/icons/feather/RotateCw.svelte";

function create_fragment$1i(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "23 4 23 10 17 10");
			add_location(polyline, file$1h, 1, 0, 34);
			attr_dev(path, "d", "M20.49 15a9 9 0 1 1-2.12-9.36L23 10");
			add_location(path, file$1h, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1h($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('RotateCw', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RotateCw> was created with unknown prop '${key}'`);
	});

	return [];
}

class RotateCw extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1h, create_fragment$1i, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "RotateCw",
			options,
			id: create_fragment$1i.name
		});
	}
}

var RotateCw$1 = RotateCw;

/* ../../components/ui/src/icons/feather/Rss.svelte generated by Svelte v3.44.2 */

const file$1g = "../../components/ui/src/icons/feather/Rss.svelte";

function create_fragment$1h(ctx) {
	let path0;
	let path1;
	let circle;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M4 11a9 9 0 0 1 9 9");
			add_location(path0, file$1g, 1, 0, 34);
			attr_dev(path1, "d", "M4 4a16 16 0 0 1 16 16");
			add_location(path1, file$1g, 1, 37, 71);
			attr_dev(circle, "cx", "5");
			attr_dev(circle, "cy", "19");
			attr_dev(circle, "r", "1");
			add_location(circle, file$1g, 1, 77, 111);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1g($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Rss', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rss> was created with unknown prop '${key}'`);
	});

	return [];
}

class Rss extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1g, create_fragment$1h, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Rss",
			options,
			id: create_fragment$1h.name
		});
	}
}

var Rss$1 = Rss;

/* ../../components/ui/src/icons/feather/Save.svelte generated by Svelte v3.44.2 */

const file$1f = "../../components/ui/src/icons/feather/Save.svelte";

function create_fragment$1g(ctx) {
	let path;
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z");
			add_location(path, file$1f, 1, 0, 34);
			attr_dev(polyline0, "points", "17 21 17 13 7 13 7 21");
			add_location(polyline0, file$1f, 1, 81, 115);
			attr_dev(polyline1, "points", "7 3 7 8 15 8");
			add_location(polyline1, file$1f, 1, 133, 167);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1f($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Save', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Save> was created with unknown prop '${key}'`);
	});

	return [];
}

class Save extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1f, create_fragment$1g, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Save",
			options,
			id: create_fragment$1g.name
		});
	}
}

var Save$1 = Save;

/* ../../components/ui/src/icons/feather/Scissors.svelte generated by Svelte v3.44.2 */

const file$1e = "../../components/ui/src/icons/feather/Scissors.svelte";

function create_fragment$1f(ctx) {
	let circle0;
	let circle1;
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "6");
			attr_dev(circle0, "cy", "6");
			attr_dev(circle0, "r", "3");
			add_location(circle0, file$1e, 1, 0, 34);
			attr_dev(circle1, "cx", "6");
			attr_dev(circle1, "cy", "18");
			attr_dev(circle1, "r", "3");
			add_location(circle1, file$1e, 1, 37, 71);
			attr_dev(line0, "x1", "20");
			attr_dev(line0, "y1", "4");
			attr_dev(line0, "x2", "8.12");
			attr_dev(line0, "y2", "15.88");
			add_location(line0, file$1e, 1, 75, 109);
			attr_dev(line1, "x1", "14.47");
			attr_dev(line1, "y1", "14.48");
			attr_dev(line1, "x2", "20");
			attr_dev(line1, "y2", "20");
			add_location(line1, file$1e, 1, 124, 158);
			attr_dev(line2, "x1", "8.12");
			attr_dev(line2, "y1", "8.12");
			attr_dev(line2, "x2", "12");
			attr_dev(line2, "y2", "12");
			add_location(line2, file$1e, 1, 175, 209);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1e($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Scissors', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scissors> was created with unknown prop '${key}'`);
	});

	return [];
}

class Scissors extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1e, create_fragment$1f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Scissors",
			options,
			id: create_fragment$1f.name
		});
	}
}

var Scissors$1 = Scissors;

/* ../../components/ui/src/icons/feather/Search.svelte generated by Svelte v3.44.2 */

const file$1d = "../../components/ui/src/icons/feather/Search.svelte";

function create_fragment$1e(ctx) {
	let circle;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "11");
			attr_dev(circle, "cy", "11");
			attr_dev(circle, "r", "8");
			add_location(circle, file$1d, 1, 0, 34);
			attr_dev(line, "x1", "21");
			attr_dev(line, "y1", "21");
			attr_dev(line, "x2", "16.65");
			attr_dev(line, "y2", "16.65");
			add_location(line, file$1d, 1, 39, 73);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1d($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Search', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Search> was created with unknown prop '${key}'`);
	});

	return [];
}

class Search extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1d, create_fragment$1e, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Search",
			options,
			id: create_fragment$1e.name
		});
	}
}

var Search$1 = Search;

/* ../../components/ui/src/icons/feather/Send.svelte generated by Svelte v3.44.2 */

const file$1c = "../../components/ui/src/icons/feather/Send.svelte";

function create_fragment$1d(ctx) {
	let line;
	let polygon;

	const block = {
		c: function create() {
			line = svg_element("line");
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", "22");
			attr_dev(line, "y1", "2");
			attr_dev(line, "x2", "11");
			attr_dev(line, "y2", "13");
			add_location(line, file$1c, 1, 0, 34);
			attr_dev(polygon, "points", "22 2 15 22 11 13 2 9 22 2");
			add_location(polygon, file$1c, 1, 44, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1c($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Send', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Send> was created with unknown prop '${key}'`);
	});

	return [];
}

class Send extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1c, create_fragment$1d, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Send",
			options,
			id: create_fragment$1d.name
		});
	}
}

var Send$1 = Send;

/* ../../components/ui/src/icons/feather/Server.svelte generated by Svelte v3.44.2 */

const file$1b = "../../components/ui/src/icons/feather/Server.svelte";

function create_fragment$1c(ctx) {
	let rect0;
	let rect1;
	let line0;
	let line1;

	const block = {
		c: function create() {
			rect0 = svg_element("rect");
			rect1 = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect0 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect0).forEach(detach_dev);

			rect1 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect1).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect0, "x", "2");
			attr_dev(rect0, "y", "2");
			attr_dev(rect0, "width", "20");
			attr_dev(rect0, "height", "8");
			attr_dev(rect0, "rx", "2");
			attr_dev(rect0, "ry", "2");
			add_location(rect0, file$1b, 1, 0, 34);
			attr_dev(rect1, "x", "2");
			attr_dev(rect1, "y", "14");
			attr_dev(rect1, "width", "20");
			attr_dev(rect1, "height", "8");
			attr_dev(rect1, "rx", "2");
			attr_dev(rect1, "ry", "2");
			add_location(rect1, file$1b, 1, 61, 95);
			attr_dev(line0, "x1", "6");
			attr_dev(line0, "y1", "6");
			attr_dev(line0, "x2", "6.01");
			attr_dev(line0, "y2", "6");
			add_location(line0, file$1b, 1, 123, 157);
			attr_dev(line1, "x1", "6");
			attr_dev(line1, "y1", "18");
			attr_dev(line1, "x2", "6.01");
			attr_dev(line1, "y2", "18");
			add_location(line1, file$1b, 1, 167, 201);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect0, anchor);
			insert_hydration_dev(target, rect1, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect0);
			if (detaching) detach_dev(rect1);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1b($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Server', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Server> was created with unknown prop '${key}'`);
	});

	return [];
}

class Server extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1b, create_fragment$1c, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Server",
			options,
			id: create_fragment$1c.name
		});
	}
}

var Server$1 = Server;

/* ../../components/ui/src/icons/feather/Share2.svelte generated by Svelte v3.44.2 */

const file$1a = "../../components/ui/src/icons/feather/Share2.svelte";

function create_fragment$1b(ctx) {
	let circle0;
	let circle1;
	let circle2;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			circle2 = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			circle2 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle2).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "18");
			attr_dev(circle0, "cy", "5");
			attr_dev(circle0, "r", "3");
			add_location(circle0, file$1a, 1, 0, 34);
			attr_dev(circle1, "cx", "6");
			attr_dev(circle1, "cy", "12");
			attr_dev(circle1, "r", "3");
			add_location(circle1, file$1a, 1, 38, 72);
			attr_dev(circle2, "cx", "18");
			attr_dev(circle2, "cy", "19");
			attr_dev(circle2, "r", "3");
			add_location(circle2, file$1a, 1, 76, 110);
			attr_dev(line0, "x1", "8.59");
			attr_dev(line0, "y1", "13.51");
			attr_dev(line0, "x2", "15.42");
			attr_dev(line0, "y2", "17.49");
			add_location(line0, file$1a, 1, 115, 149);
			attr_dev(line1, "x1", "15.41");
			attr_dev(line1, "y1", "6.51");
			attr_dev(line1, "x2", "8.59");
			attr_dev(line1, "y2", "10.49");
			add_location(line1, file$1a, 1, 171, 205);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, circle2, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(circle2);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1a($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Share2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Share2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Share2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1a, create_fragment$1b, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Share2",
			options,
			id: create_fragment$1b.name
		});
	}
}

var Share2$1 = Share2;

/* ../../components/ui/src/icons/feather/Share.svelte generated by Svelte v3.44.2 */

const file$19 = "../../components/ui/src/icons/feather/Share.svelte";

function create_fragment$1a(ctx) {
	let path;
	let polyline;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8");
			add_location(path, file$19, 1, 0, 34);
			attr_dev(polyline, "points", "16 6 12 2 8 6");
			add_location(polyline, file$19, 1, 59, 93);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "2");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "15");
			add_location(line, file$19, 1, 103, 137);
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
		block,
		id: create_fragment$1a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$19($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Share', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Share> was created with unknown prop '${key}'`);
	});

	return [];
}

class Share extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$19, create_fragment$1a, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Share",
			options,
			id: create_fragment$1a.name
		});
	}
}

var Share$1 = Share;

/* ../../components/ui/src/icons/feather/ShieldOff.svelte generated by Svelte v3.44.2 */

const file$18 = "../../components/ui/src/icons/feather/ShieldOff.svelte";

function create_fragment$19(ctx) {
	let path0;
	let path1;
	let line;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18");
			add_location(path0, file$18, 1, 0, 34);
			attr_dev(path1, "d", "M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38");
			add_location(path1, file$18, 1, 64, 98);
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "23");
			add_location(line, file$18, 1, 140, 174);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$19.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$18($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ShieldOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ShieldOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class ShieldOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$18, create_fragment$19, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ShieldOff",
			options,
			id: create_fragment$19.name
		});
	}
}

var ShieldOff$1 = ShieldOff;

/* ../../components/ui/src/icons/feather/Shield.svelte generated by Svelte v3.44.2 */

const file$17 = "../../components/ui/src/icons/feather/Shield.svelte";

function create_fragment$18(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z");
			add_location(path, file$17, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$18.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$17($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Shield', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Shield> was created with unknown prop '${key}'`);
	});

	return [];
}

class Shield extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$17, create_fragment$18, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Shield",
			options,
			id: create_fragment$18.name
		});
	}
}

var Shield$1 = Shield;

/* ../../components/ui/src/icons/feather/ShoppingBag.svelte generated by Svelte v3.44.2 */

const file$16 = "../../components/ui/src/icons/feather/ShoppingBag.svelte";

function create_fragment$17(ctx) {
	let path0;
	let line;
	let path1;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			line = svg_element("line");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z");
			add_location(path0, file$16, 1, 0, 34);
			attr_dev(line, "x1", "3");
			attr_dev(line, "y1", "6");
			attr_dev(line, "x2", "21");
			attr_dev(line, "y2", "6");
			add_location(line, file$16, 1, 68, 102);
			attr_dev(path1, "d", "M16 10a4 4 0 0 1-8 0");
			add_location(path1, file$16, 1, 110, 144);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$17.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$16($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ShoppingBag', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ShoppingBag> was created with unknown prop '${key}'`);
	});

	return [];
}

class ShoppingBag extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$16, create_fragment$17, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ShoppingBag",
			options,
			id: create_fragment$17.name
		});
	}
}

var ShoppingBag$1 = ShoppingBag;

/* ../../components/ui/src/icons/feather/ShoppingCart.svelte generated by Svelte v3.44.2 */

const file$15 = "../../components/ui/src/icons/feather/ShoppingCart.svelte";

function create_fragment$16(ctx) {
	let circle0;
	let circle1;
	let path;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "9");
			attr_dev(circle0, "cy", "21");
			attr_dev(circle0, "r", "1");
			add_location(circle0, file$15, 1, 0, 34);
			attr_dev(circle1, "cx", "20");
			attr_dev(circle1, "cy", "21");
			attr_dev(circle1, "r", "1");
			add_location(circle1, file$15, 1, 38, 72);
			attr_dev(path, "d", "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6");
			add_location(path, file$15, 1, 77, 111);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$16.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$15($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ShoppingCart', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ShoppingCart> was created with unknown prop '${key}'`);
	});

	return [];
}

class ShoppingCart extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$15, create_fragment$16, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ShoppingCart",
			options,
			id: create_fragment$16.name
		});
	}
}

var ShoppingCart$1 = ShoppingCart;

/* ../../components/ui/src/icons/feather/Shuffle.svelte generated by Svelte v3.44.2 */

const file$14 = "../../components/ui/src/icons/feather/Shuffle.svelte";

function create_fragment$15(ctx) {
	let polyline0;
	let line0;
	let polyline1;
	let line1;
	let line2;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			line0 = svg_element("line");
			polyline1 = svg_element("polyline");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "16 3 21 3 21 8");
			add_location(polyline0, file$14, 1, 0, 34);
			attr_dev(line0, "x1", "4");
			attr_dev(line0, "y1", "20");
			attr_dev(line0, "x2", "21");
			attr_dev(line0, "y2", "3");
			add_location(line0, file$14, 1, 45, 79);
			attr_dev(polyline1, "points", "21 16 21 21 16 21");
			add_location(polyline1, file$14, 1, 88, 122);
			attr_dev(line1, "x1", "15");
			attr_dev(line1, "y1", "15");
			attr_dev(line1, "x2", "21");
			attr_dev(line1, "y2", "21");
			add_location(line1, file$14, 1, 136, 170);
			attr_dev(line2, "x1", "4");
			attr_dev(line2, "y1", "4");
			attr_dev(line2, "x2", "9");
			attr_dev(line2, "y2", "9");
			add_location(line2, file$14, 1, 181, 215);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$15.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$14($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Shuffle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Shuffle> was created with unknown prop '${key}'`);
	});

	return [];
}

class Shuffle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$14, create_fragment$15, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Shuffle",
			options,
			id: create_fragment$15.name
		});
	}
}

var Shuffle$1 = Shuffle;

/* ../../components/ui/src/icons/feather/Sidebar.svelte generated by Svelte v3.44.2 */

const file$13 = "../../components/ui/src/icons/feather/Sidebar.svelte";

function create_fragment$14(ctx) {
	let rect;
	let line;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$13, 1, 0, 34);
			attr_dev(line, "x1", "9");
			attr_dev(line, "y1", "3");
			attr_dev(line, "x2", "9");
			attr_dev(line, "y2", "21");
			add_location(line, file$13, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$14.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$13($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Sidebar', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sidebar> was created with unknown prop '${key}'`);
	});

	return [];
}

class Sidebar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$13, create_fragment$14, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Sidebar",
			options,
			id: create_fragment$14.name
		});
	}
}

var Sidebar$1 = Sidebar;

/* ../../components/ui/src/icons/feather/SkipBack.svelte generated by Svelte v3.44.2 */

const file$12 = "../../components/ui/src/icons/feather/SkipBack.svelte";

function create_fragment$13(ctx) {
	let polygon;
	let line;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "19 20 9 12 19 4 19 20");
			add_location(polygon, file$12, 1, 0, 34);
			attr_dev(line, "x1", "5");
			attr_dev(line, "y1", "19");
			attr_dev(line, "x2", "5");
			attr_dev(line, "y2", "5");
			add_location(line, file$12, 1, 50, 84);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$13.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$12($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SkipBack', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkipBack> was created with unknown prop '${key}'`);
	});

	return [];
}

class SkipBack extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$12, create_fragment$13, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SkipBack",
			options,
			id: create_fragment$13.name
		});
	}
}

var SkipBack$1 = SkipBack;

/* ../../components/ui/src/icons/feather/SkipForward.svelte generated by Svelte v3.44.2 */

const file$11 = "../../components/ui/src/icons/feather/SkipForward.svelte";

function create_fragment$12(ctx) {
	let polygon;
	let line;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "5 4 15 12 5 20 5 4");
			add_location(polygon, file$11, 1, 0, 34);
			attr_dev(line, "x1", "19");
			attr_dev(line, "y1", "5");
			attr_dev(line, "x2", "19");
			attr_dev(line, "y2", "19");
			add_location(line, file$11, 1, 47, 81);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$12.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$11($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SkipForward', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkipForward> was created with unknown prop '${key}'`);
	});

	return [];
}

class SkipForward extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$11, create_fragment$12, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SkipForward",
			options,
			id: create_fragment$12.name
		});
	}
}

var SkipForward$1 = SkipForward;

/* ../../components/ui/src/icons/feather/Slack.svelte generated by Svelte v3.44.2 */

const file$10 = "../../components/ui/src/icons/feather/Slack.svelte";

function create_fragment$11(ctx) {
	let path0;
	let path1;
	let path2;
	let path3;
	let path4;
	let path5;
	let path6;
	let path7;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			path4 = svg_element("path");
			path5 = svg_element("path");
			path6 = svg_element("path");
			path7 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			path2 = claim_svg_element(nodes, "path", { d: true });
			children(path2).forEach(detach_dev);
			path3 = claim_svg_element(nodes, "path", { d: true });
			children(path3).forEach(detach_dev);
			path4 = claim_svg_element(nodes, "path", { d: true });
			children(path4).forEach(detach_dev);
			path5 = claim_svg_element(nodes, "path", { d: true });
			children(path5).forEach(detach_dev);
			path6 = claim_svg_element(nodes, "path", { d: true });
			children(path6).forEach(detach_dev);
			path7 = claim_svg_element(nodes, "path", { d: true });
			children(path7).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z");
			add_location(path0, file$10, 1, 0, 34);
			attr_dev(path1, "d", "M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z");
			add_location(path1, file$10, 1, 113, 147);
			attr_dev(path2, "d", "M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z");
			add_location(path2, file$10, 1, 199, 233);
			attr_dev(path3, "d", "M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z");
			add_location(path3, file$10, 1, 309, 343);
			attr_dev(path4, "d", "M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z");
			add_location(path4, file$10, 1, 393, 427);
			attr_dev(path5, "d", "M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z");
			add_location(path5, file$10, 1, 507, 541);
			attr_dev(path6, "d", "M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z");
			add_location(path6, file$10, 1, 594, 628);
			attr_dev(path7, "d", "M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z");
			add_location(path7, file$10, 1, 703, 737);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, path2, anchor);
			insert_hydration_dev(target, path3, anchor);
			insert_hydration_dev(target, path4, anchor);
			insert_hydration_dev(target, path5, anchor);
			insert_hydration_dev(target, path6, anchor);
			insert_hydration_dev(target, path7, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(path2);
			if (detaching) detach_dev(path3);
			if (detaching) detach_dev(path4);
			if (detaching) detach_dev(path5);
			if (detaching) detach_dev(path6);
			if (detaching) detach_dev(path7);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$11.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$10($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Slack', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slack> was created with unknown prop '${key}'`);
	});

	return [];
}

class Slack extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$10, create_fragment$11, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Slack",
			options,
			id: create_fragment$11.name
		});
	}
}

var Slack$1 = Slack;

/* ../../components/ui/src/icons/feather/Slash.svelte generated by Svelte v3.44.2 */

const file$$ = "../../components/ui/src/icons/feather/Slash.svelte";

function create_fragment$10(ctx) {
	let circle;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$$, 1, 0, 34);
			attr_dev(line, "x1", "4.93");
			attr_dev(line, "y1", "4.93");
			attr_dev(line, "x2", "19.07");
			attr_dev(line, "y2", "19.07");
			add_location(line, file$$, 1, 40, 74);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$10.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$$($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Slash', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slash> was created with unknown prop '${key}'`);
	});

	return [];
}

class Slash extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$$, create_fragment$10, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Slash",
			options,
			id: create_fragment$10.name
		});
	}
}

var Slash$1 = Slash;

/* ../../components/ui/src/icons/feather/Sliders.svelte generated by Svelte v3.44.2 */

const file$_ = "../../components/ui/src/icons/feather/Sliders.svelte";

function create_fragment$$(ctx) {
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;
	let line6;
	let line7;
	let line8;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			line6 = svg_element("line");
			line7 = svg_element("line");
			line8 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			line6 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line6).forEach(detach_dev);
			line7 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line7).forEach(detach_dev);
			line8 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line8).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "4");
			attr_dev(line0, "y1", "21");
			attr_dev(line0, "x2", "4");
			attr_dev(line0, "y2", "14");
			add_location(line0, file$_, 1, 0, 34);
			attr_dev(line1, "x1", "4");
			attr_dev(line1, "y1", "10");
			attr_dev(line1, "x2", "4");
			attr_dev(line1, "y2", "3");
			add_location(line1, file$_, 1, 43, 77);
			attr_dev(line2, "x1", "12");
			attr_dev(line2, "y1", "21");
			attr_dev(line2, "x2", "12");
			attr_dev(line2, "y2", "12");
			add_location(line2, file$_, 1, 85, 119);
			attr_dev(line3, "x1", "12");
			attr_dev(line3, "y1", "8");
			attr_dev(line3, "x2", "12");
			attr_dev(line3, "y2", "3");
			add_location(line3, file$_, 1, 130, 164);
			attr_dev(line4, "x1", "20");
			attr_dev(line4, "y1", "21");
			attr_dev(line4, "x2", "20");
			attr_dev(line4, "y2", "16");
			add_location(line4, file$_, 1, 173, 207);
			attr_dev(line5, "x1", "20");
			attr_dev(line5, "y1", "12");
			attr_dev(line5, "x2", "20");
			attr_dev(line5, "y2", "3");
			add_location(line5, file$_, 1, 218, 252);
			attr_dev(line6, "x1", "1");
			attr_dev(line6, "y1", "14");
			attr_dev(line6, "x2", "7");
			attr_dev(line6, "y2", "14");
			add_location(line6, file$_, 1, 262, 296);
			attr_dev(line7, "x1", "9");
			attr_dev(line7, "y1", "8");
			attr_dev(line7, "x2", "15");
			attr_dev(line7, "y2", "8");
			add_location(line7, file$_, 1, 305, 339);
			attr_dev(line8, "x1", "17");
			attr_dev(line8, "y1", "16");
			attr_dev(line8, "x2", "23");
			attr_dev(line8, "y2", "16");
			add_location(line8, file$_, 1, 347, 381);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
			insert_hydration_dev(target, line6, anchor);
			insert_hydration_dev(target, line7, anchor);
			insert_hydration_dev(target, line8, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
			if (detaching) detach_dev(line6);
			if (detaching) detach_dev(line7);
			if (detaching) detach_dev(line8);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$$.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$_($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Sliders', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sliders> was created with unknown prop '${key}'`);
	});

	return [];
}

class Sliders extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$_, create_fragment$$, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Sliders",
			options,
			id: create_fragment$$.name
		});
	}
}

var Sliders$1 = Sliders;

/* ../../components/ui/src/icons/feather/Smartphone.svelte generated by Svelte v3.44.2 */

const file$Z = "../../components/ui/src/icons/feather/Smartphone.svelte";

function create_fragment$_(ctx) {
	let rect;
	let line;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "5");
			attr_dev(rect, "y", "2");
			attr_dev(rect, "width", "14");
			attr_dev(rect, "height", "20");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$Z, 1, 0, 34);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "18");
			attr_dev(line, "x2", "12.01");
			attr_dev(line, "y2", "18");
			add_location(line, file$Z, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$_.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$Z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Smartphone', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Smartphone> was created with unknown prop '${key}'`);
	});

	return [];
}

class Smartphone extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$Z, create_fragment$_, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Smartphone",
			options,
			id: create_fragment$_.name
		});
	}
}

var Smartphone$1 = Smartphone;

/* ../../components/ui/src/icons/feather/Smile.svelte generated by Svelte v3.44.2 */

const file$Y = "../../components/ui/src/icons/feather/Smile.svelte";

function create_fragment$Z(ctx) {
	let circle;
	let path;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$Y, 1, 0, 34);
			attr_dev(path, "d", "M8 14s1.5 2 4 2 4-2 4-2");
			add_location(path, file$Y, 1, 40, 74);
			attr_dev(line0, "x1", "9");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "9.01");
			attr_dev(line0, "y2", "9");
			add_location(line0, file$Y, 1, 81, 115);
			attr_dev(line1, "x1", "15");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "15.01");
			attr_dev(line1, "y2", "9");
			add_location(line1, file$Y, 1, 125, 159);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$Z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$Y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Smile', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Smile> was created with unknown prop '${key}'`);
	});

	return [];
}

class Smile extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$Y, create_fragment$Z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Smile",
			options,
			id: create_fragment$Z.name
		});
	}
}

var Smile$1 = Smile;

/* ../../components/ui/src/icons/feather/Speaker.svelte generated by Svelte v3.44.2 */

const file$X = "../../components/ui/src/icons/feather/Speaker.svelte";

function create_fragment$Y(ctx) {
	let rect;
	let circle;
	let line;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			circle = svg_element("circle");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "4");
			attr_dev(rect, "y", "2");
			attr_dev(rect, "width", "16");
			attr_dev(rect, "height", "20");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$X, 1, 0, 34);
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "14");
			attr_dev(circle, "r", "4");
			add_location(circle, file$X, 1, 62, 96);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "6");
			attr_dev(line, "x2", "12.01");
			attr_dev(line, "y2", "6");
			add_location(line, file$X, 1, 101, 135);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$Y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$X($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Speaker', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Speaker> was created with unknown prop '${key}'`);
	});

	return [];
}

class Speaker extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$X, create_fragment$Y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Speaker",
			options,
			id: create_fragment$Y.name
		});
	}
}

var Speaker$1 = Speaker;

/* ../../components/ui/src/icons/feather/Star.svelte generated by Svelte v3.44.2 */

const file$W = "../../components/ui/src/icons/feather/Star.svelte";

function create_fragment$X(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2");
			add_location(polygon, file$W, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$X.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$W($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Star', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Star> was created with unknown prop '${key}'`);
	});

	return [];
}

class Star extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$W, create_fragment$X, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Star",
			options,
			id: create_fragment$X.name
		});
	}
}

var Star$1 = Star;

/* ../../components/ui/src/icons/feather/StopCircle.svelte generated by Svelte v3.44.2 */

const file$V = "../../components/ui/src/icons/feather/StopCircle.svelte";

function create_fragment$W(ctx) {
	let circle;
	let rect;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);

			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$V, 1, 0, 34);
			attr_dev(rect, "x", "9");
			attr_dev(rect, "y", "9");
			attr_dev(rect, "width", "6");
			attr_dev(rect, "height", "6");
			add_location(rect, file$V, 1, 40, 74);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, rect, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$W.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$V($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('StopCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StopCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class StopCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$V, create_fragment$W, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "StopCircle",
			options,
			id: create_fragment$W.name
		});
	}
}

var StopCircle$1 = StopCircle;

/* ../../components/ui/src/icons/feather/Sunrise.svelte generated by Svelte v3.44.2 */

const file$U = "../../components/ui/src/icons/feather/Sunrise.svelte";

function create_fragment$V(ctx) {
	let path;
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M17 18a5 5 0 0 0-10 0");
			add_location(path, file$U, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "2");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "9");
			add_location(line0, file$U, 1, 39, 73);
			attr_dev(line1, "x1", "4.22");
			attr_dev(line1, "y1", "10.22");
			attr_dev(line1, "x2", "5.64");
			attr_dev(line1, "y2", "11.64");
			add_location(line1, file$U, 1, 82, 116);
			attr_dev(line2, "x1", "1");
			attr_dev(line2, "y1", "18");
			attr_dev(line2, "x2", "3");
			attr_dev(line2, "y2", "18");
			add_location(line2, file$U, 1, 137, 171);
			attr_dev(line3, "x1", "21");
			attr_dev(line3, "y1", "18");
			attr_dev(line3, "x2", "23");
			attr_dev(line3, "y2", "18");
			add_location(line3, file$U, 1, 180, 214);
			attr_dev(line4, "x1", "18.36");
			attr_dev(line4, "y1", "11.64");
			attr_dev(line4, "x2", "19.78");
			attr_dev(line4, "y2", "10.22");
			add_location(line4, file$U, 1, 225, 259);
			attr_dev(line5, "x1", "23");
			attr_dev(line5, "y1", "22");
			attr_dev(line5, "x2", "1");
			attr_dev(line5, "y2", "22");
			add_location(line5, file$U, 1, 282, 316);
			attr_dev(polyline, "points", "8 6 12 2 16 6");
			add_location(polyline, file$U, 1, 326, 360);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$V.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$U($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Sunrise', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sunrise> was created with unknown prop '${key}'`);
	});

	return [];
}

class Sunrise extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$U, create_fragment$V, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Sunrise",
			options,
			id: create_fragment$V.name
		});
	}
}

var Sunrise$1 = Sunrise;

/* ../../components/ui/src/icons/feather/Sunset.svelte generated by Svelte v3.44.2 */

const file$T = "../../components/ui/src/icons/feather/Sunset.svelte";

function create_fragment$U(ctx) {
	let path;
	let line0;
	let line1;
	let line2;
	let line3;
	let line4;
	let line5;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			line3 = svg_element("line");
			line4 = svg_element("line");
			line5 = svg_element("line");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			line3 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line3).forEach(detach_dev);
			line4 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line4).forEach(detach_dev);
			line5 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line5).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M17 18a5 5 0 0 0-10 0");
			add_location(path, file$T, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "2");
			add_location(line0, file$T, 1, 39, 73);
			attr_dev(line1, "x1", "4.22");
			attr_dev(line1, "y1", "10.22");
			attr_dev(line1, "x2", "5.64");
			attr_dev(line1, "y2", "11.64");
			add_location(line1, file$T, 1, 82, 116);
			attr_dev(line2, "x1", "1");
			attr_dev(line2, "y1", "18");
			attr_dev(line2, "x2", "3");
			attr_dev(line2, "y2", "18");
			add_location(line2, file$T, 1, 137, 171);
			attr_dev(line3, "x1", "21");
			attr_dev(line3, "y1", "18");
			attr_dev(line3, "x2", "23");
			attr_dev(line3, "y2", "18");
			add_location(line3, file$T, 1, 180, 214);
			attr_dev(line4, "x1", "18.36");
			attr_dev(line4, "y1", "11.64");
			attr_dev(line4, "x2", "19.78");
			attr_dev(line4, "y2", "10.22");
			add_location(line4, file$T, 1, 225, 259);
			attr_dev(line5, "x1", "23");
			attr_dev(line5, "y1", "22");
			attr_dev(line5, "x2", "1");
			attr_dev(line5, "y2", "22");
			add_location(line5, file$T, 1, 282, 316);
			attr_dev(polyline, "points", "16 5 12 9 8 5");
			add_location(polyline, file$T, 1, 326, 360);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
			insert_hydration_dev(target, line3, anchor);
			insert_hydration_dev(target, line4, anchor);
			insert_hydration_dev(target, line5, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
			if (detaching) detach_dev(line3);
			if (detaching) detach_dev(line4);
			if (detaching) detach_dev(line5);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$U.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$T($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Sunset', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sunset> was created with unknown prop '${key}'`);
	});

	return [];
}

class Sunset extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$T, create_fragment$U, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Sunset",
			options,
			id: create_fragment$U.name
		});
	}
}

var Sunset$1 = Sunset;

/* ../../components/ui/src/icons/feather/Tablet.svelte generated by Svelte v3.44.2 */

const file$S = "../../components/ui/src/icons/feather/Tablet.svelte";

function create_fragment$T(ctx) {
	let rect;
	let line;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "4");
			attr_dev(rect, "y", "2");
			attr_dev(rect, "width", "16");
			attr_dev(rect, "height", "20");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$S, 1, 0, 34);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "18");
			attr_dev(line, "x2", "12.01");
			attr_dev(line, "y2", "18");
			add_location(line, file$S, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$T.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$S($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Tablet', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tablet> was created with unknown prop '${key}'`);
	});

	return [];
}

class Tablet extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$S, create_fragment$T, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Tablet",
			options,
			id: create_fragment$T.name
		});
	}
}

var Tablet$1 = Tablet;

/* ../../components/ui/src/icons/feather/Tag.svelte generated by Svelte v3.44.2 */

const file$R = "../../components/ui/src/icons/feather/Tag.svelte";

function create_fragment$S(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z");
			add_location(path, file$R, 1, 0, 34);
			attr_dev(line, "x1", "7");
			attr_dev(line, "y1", "7");
			attr_dev(line, "x2", "7.01");
			attr_dev(line, "y2", "7");
			add_location(line, file$R, 1, 96, 130);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$S.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$R($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Tag', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tag> was created with unknown prop '${key}'`);
	});

	return [];
}

class Tag extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$R, create_fragment$S, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Tag",
			options,
			id: create_fragment$S.name
		});
	}
}

var Tag$1 = Tag;

/* ../../components/ui/src/icons/feather/Target.svelte generated by Svelte v3.44.2 */

const file$Q = "../../components/ui/src/icons/feather/Target.svelte";

function create_fragment$R(ctx) {
	let circle0;
	let circle1;
	let circle2;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			circle2 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			circle2 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "12");
			attr_dev(circle0, "r", "10");
			add_location(circle0, file$Q, 1, 0, 34);
			attr_dev(circle1, "cx", "12");
			attr_dev(circle1, "cy", "12");
			attr_dev(circle1, "r", "6");
			add_location(circle1, file$Q, 1, 40, 74);
			attr_dev(circle2, "cx", "12");
			attr_dev(circle2, "cy", "12");
			attr_dev(circle2, "r", "2");
			add_location(circle2, file$Q, 1, 79, 113);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, circle2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(circle2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$R.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$Q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Target', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Target> was created with unknown prop '${key}'`);
	});

	return [];
}

class Target extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$Q, create_fragment$R, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Target",
			options,
			id: create_fragment$R.name
		});
	}
}

var Target$1 = Target;

/* ../../components/ui/src/icons/feather/Terminal.svelte generated by Svelte v3.44.2 */

const file$P = "../../components/ui/src/icons/feather/Terminal.svelte";

function create_fragment$Q(ctx) {
	let polyline;
	let line;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "4 17 10 11 4 5");
			add_location(polyline, file$P, 1, 0, 34);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "19");
			attr_dev(line, "x2", "20");
			attr_dev(line, "y2", "19");
			add_location(line, file$P, 1, 45, 79);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$Q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$P($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Terminal', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Terminal> was created with unknown prop '${key}'`);
	});

	return [];
}

class Terminal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$P, create_fragment$Q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Terminal",
			options,
			id: create_fragment$Q.name
		});
	}
}

var Terminal$1 = Terminal;

/* ../../components/ui/src/icons/feather/Thermometer.svelte generated by Svelte v3.44.2 */

const file$O = "../../components/ui/src/icons/feather/Thermometer.svelte";

function create_fragment$P(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z");
			add_location(path, file$O, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$P.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$O($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Thermometer', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Thermometer> was created with unknown prop '${key}'`);
	});

	return [];
}

class Thermometer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$O, create_fragment$P, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Thermometer",
			options,
			id: create_fragment$P.name
		});
	}
}

var Thermometer$1 = Thermometer;

/* ../../components/ui/src/icons/feather/ThumbsDown.svelte generated by Svelte v3.44.2 */

const file$N = "../../components/ui/src/icons/feather/ThumbsDown.svelte";

function create_fragment$O(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17");
			add_location(path, file$N, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$O.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$N($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ThumbsDown', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ThumbsDown> was created with unknown prop '${key}'`);
	});

	return [];
}

class ThumbsDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$N, create_fragment$O, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ThumbsDown",
			options,
			id: create_fragment$O.name
		});
	}
}

var ThumbsDown$1 = ThumbsDown;

/* ../../components/ui/src/icons/feather/ThumbsUp.svelte generated by Svelte v3.44.2 */

const file$M = "../../components/ui/src/icons/feather/ThumbsUp.svelte";

function create_fragment$N(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3");
			add_location(path, file$M, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$N.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$M($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ThumbsUp', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ThumbsUp> was created with unknown prop '${key}'`);
	});

	return [];
}

class ThumbsUp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$M, create_fragment$N, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ThumbsUp",
			options,
			id: create_fragment$N.name
		});
	}
}

var ThumbsUp$1 = ThumbsUp;

/* ../../components/ui/src/icons/feather/ToggleLeft.svelte generated by Svelte v3.44.2 */

const file$L = "../../components/ui/src/icons/feather/ToggleLeft.svelte";

function create_fragment$M(ctx) {
	let rect;
	let circle;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "1");
			attr_dev(rect, "y", "5");
			attr_dev(rect, "width", "22");
			attr_dev(rect, "height", "14");
			attr_dev(rect, "rx", "7");
			attr_dev(rect, "ry", "7");
			add_location(rect, file$L, 1, 0, 34);
			attr_dev(circle, "cx", "8");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "3");
			add_location(circle, file$L, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$M.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$L($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ToggleLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ToggleLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class ToggleLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$L, create_fragment$M, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ToggleLeft",
			options,
			id: create_fragment$M.name
		});
	}
}

var ToggleLeft$1 = ToggleLeft;

/* ../../components/ui/src/icons/feather/ToggleRight.svelte generated by Svelte v3.44.2 */

const file$K = "../../components/ui/src/icons/feather/ToggleRight.svelte";

function create_fragment$L(ctx) {
	let rect;
	let circle;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "1");
			attr_dev(rect, "y", "5");
			attr_dev(rect, "width", "22");
			attr_dev(rect, "height", "14");
			attr_dev(rect, "rx", "7");
			attr_dev(rect, "ry", "7");
			add_location(rect, file$K, 1, 0, 34);
			attr_dev(circle, "cx", "16");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "3");
			add_location(circle, file$K, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$L.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$K($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ToggleRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ToggleRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class ToggleRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$K, create_fragment$L, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ToggleRight",
			options,
			id: create_fragment$L.name
		});
	}
}

var ToggleRight$1 = ToggleRight;

/* ../../components/ui/src/icons/feather/Tool.svelte generated by Svelte v3.44.2 */

const file$J = "../../components/ui/src/icons/feather/Tool.svelte";

function create_fragment$K(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z");
			add_location(path, file$J, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$K.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$J($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Tool', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tool> was created with unknown prop '${key}'`);
	});

	return [];
}

class Tool extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$J, create_fragment$K, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Tool",
			options,
			id: create_fragment$K.name
		});
	}
}

var Tool$1 = Tool;

/* ../../components/ui/src/icons/feather/Trash2.svelte generated by Svelte v3.44.2 */

const file$I = "../../components/ui/src/icons/feather/Trash2.svelte";

function create_fragment$J(ctx) {
	let polyline;
	let path;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "3 6 5 6 21 6");
			add_location(polyline, file$I, 1, 0, 34);
			attr_dev(path, "d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2");
			add_location(path, file$I, 1, 43, 77);
			attr_dev(line0, "x1", "10");
			attr_dev(line0, "y1", "11");
			attr_dev(line0, "x2", "10");
			attr_dev(line0, "y2", "17");
			add_location(line0, file$I, 1, 139, 173);
			attr_dev(line1, "x1", "14");
			attr_dev(line1, "y1", "11");
			attr_dev(line1, "x2", "14");
			attr_dev(line1, "y2", "17");
			add_location(line1, file$I, 1, 184, 218);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$J.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$I($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Trash2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Trash2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Trash2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$I, create_fragment$J, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Trash2",
			options,
			id: create_fragment$J.name
		});
	}
}

var Trash2$1 = Trash2;

/* ../../components/ui/src/icons/feather/Trash.svelte generated by Svelte v3.44.2 */

const file$H = "../../components/ui/src/icons/feather/Trash.svelte";

function create_fragment$I(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "3 6 5 6 21 6");
			add_location(polyline, file$H, 1, 0, 34);
			attr_dev(path, "d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2");
			add_location(path, file$H, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$I.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$H($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Trash', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Trash> was created with unknown prop '${key}'`);
	});

	return [];
}

class Trash extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$H, create_fragment$I, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Trash",
			options,
			id: create_fragment$I.name
		});
	}
}

var Trash$1 = Trash;

/* ../../components/ui/src/icons/feather/Trello.svelte generated by Svelte v3.44.2 */

const file$G = "../../components/ui/src/icons/feather/Trello.svelte";

function create_fragment$H(ctx) {
	let rect0;
	let rect1;
	let rect2;

	const block = {
		c: function create() {
			rect0 = svg_element("rect");
			rect1 = svg_element("rect");
			rect2 = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect0 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect0).forEach(detach_dev);

			rect1 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect1).forEach(detach_dev);

			rect2 = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect0, "x", "3");
			attr_dev(rect0, "y", "3");
			attr_dev(rect0, "width", "18");
			attr_dev(rect0, "height", "18");
			attr_dev(rect0, "rx", "2");
			attr_dev(rect0, "ry", "2");
			add_location(rect0, file$G, 1, 0, 34);
			attr_dev(rect1, "x", "7");
			attr_dev(rect1, "y", "7");
			attr_dev(rect1, "width", "3");
			attr_dev(rect1, "height", "9");
			add_location(rect1, file$G, 1, 62, 96);
			attr_dev(rect2, "x", "14");
			attr_dev(rect2, "y", "7");
			attr_dev(rect2, "width", "3");
			attr_dev(rect2, "height", "5");
			add_location(rect2, file$G, 1, 108, 142);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect0, anchor);
			insert_hydration_dev(target, rect1, anchor);
			insert_hydration_dev(target, rect2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect0);
			if (detaching) detach_dev(rect1);
			if (detaching) detach_dev(rect2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$H.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$G($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Trello', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Trello> was created with unknown prop '${key}'`);
	});

	return [];
}

class Trello extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$G, create_fragment$H, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Trello",
			options,
			id: create_fragment$H.name
		});
	}
}

var Trello$1 = Trello;

/* ../../components/ui/src/icons/feather/TrendingDown.svelte generated by Svelte v3.44.2 */

const file$F = "../../components/ui/src/icons/feather/TrendingDown.svelte";

function create_fragment$G(ctx) {
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "23 18 13.5 8.5 8.5 13.5 1 6");
			add_location(polyline0, file$F, 1, 0, 34);
			attr_dev(polyline1, "points", "17 18 23 18 23 12");
			add_location(polyline1, file$F, 1, 58, 92);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$G.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$F($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TrendingDown', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TrendingDown> was created with unknown prop '${key}'`);
	});

	return [];
}

class TrendingDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$F, create_fragment$G, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TrendingDown",
			options,
			id: create_fragment$G.name
		});
	}
}

var TrendingDown$1 = TrendingDown;

/* ../../components/ui/src/icons/feather/TrendingUp.svelte generated by Svelte v3.44.2 */

const file$E = "../../components/ui/src/icons/feather/TrendingUp.svelte";

function create_fragment$F(ctx) {
	let polyline0;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "23 6 13.5 15.5 8.5 10.5 1 18");
			add_location(polyline0, file$E, 1, 0, 34);
			attr_dev(polyline1, "points", "17 6 23 6 23 12");
			add_location(polyline1, file$E, 1, 59, 93);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$F.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$E($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TrendingUp', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TrendingUp> was created with unknown prop '${key}'`);
	});

	return [];
}

class TrendingUp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$E, create_fragment$F, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TrendingUp",
			options,
			id: create_fragment$F.name
		});
	}
}

var TrendingUp$1 = TrendingUp;

/* ../../components/ui/src/icons/feather/Triangle.svelte generated by Svelte v3.44.2 */

const file$D = "../../components/ui/src/icons/feather/Triangle.svelte";

function create_fragment$E(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z");
			add_location(path, file$D, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$E.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$D($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Triangle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Triangle> was created with unknown prop '${key}'`);
	});

	return [];
}

class Triangle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$D, create_fragment$E, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Triangle",
			options,
			id: create_fragment$E.name
		});
	}
}

var Triangle$1 = Triangle;

/* ../../components/ui/src/icons/feather/Truck.svelte generated by Svelte v3.44.2 */

const file$C = "../../components/ui/src/icons/feather/Truck.svelte";

function create_fragment$D(ctx) {
	let rect;
	let polygon;
	let circle0;
	let circle1;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			polygon = svg_element("polygon");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true
			});

			children(rect).forEach(detach_dev);
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "1");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "15");
			attr_dev(rect, "height", "13");
			add_location(rect, file$C, 1, 0, 34);
			attr_dev(polygon, "points", "16 8 20 8 23 11 23 16 16 16 16 8");
			add_location(polygon, file$C, 1, 48, 82);
			attr_dev(circle0, "cx", "5.5");
			attr_dev(circle0, "cy", "18.5");
			attr_dev(circle0, "r", "2.5");
			add_location(circle0, file$C, 1, 109, 143);
			attr_dev(circle1, "cx", "18.5");
			attr_dev(circle1, "cy", "18.5");
			attr_dev(circle1, "r", "2.5");
			add_location(circle1, file$C, 1, 153, 187);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$D.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$C($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Truck', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Truck> was created with unknown prop '${key}'`);
	});

	return [];
}

class Truck extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$C, create_fragment$D, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Truck",
			options,
			id: create_fragment$D.name
		});
	}
}

var Truck$1 = Truck;

/* ../../components/ui/src/icons/feather/Tv.svelte generated by Svelte v3.44.2 */

const file$B = "../../components/ui/src/icons/feather/Tv.svelte";

function create_fragment$C(ctx) {
	let rect;
	let polyline;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "2");
			attr_dev(rect, "y", "7");
			attr_dev(rect, "width", "20");
			attr_dev(rect, "height", "15");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$B, 1, 0, 34);
			attr_dev(polyline, "points", "17 2 12 7 7 2");
			add_location(polyline, file$B, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$C.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$B($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Tv', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tv> was created with unknown prop '${key}'`);
	});

	return [];
}

class Tv extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$B, create_fragment$C, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Tv",
			options,
			id: create_fragment$C.name
		});
	}
}

var Tv$1 = Tv;

/* ../../components/ui/src/icons/feather/Twitch.svelte generated by Svelte v3.44.2 */

const file$A = "../../components/ui/src/icons/feather/Twitch.svelte";

function create_fragment$B(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7");
			add_location(path, file$A, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$B.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$A($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Twitch', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Twitch> was created with unknown prop '${key}'`);
	});

	return [];
}

class Twitch extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$A, create_fragment$B, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Twitch",
			options,
			id: create_fragment$B.name
		});
	}
}

var Twitch$1 = Twitch;

/* ../../components/ui/src/icons/feather/Twitter.svelte generated by Svelte v3.44.2 */

const file$z = "../../components/ui/src/icons/feather/Twitter.svelte";

function create_fragment$A(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z");
			add_location(path, file$z, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$A.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$z($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Twitter', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Twitter> was created with unknown prop '${key}'`);
	});

	return [];
}

class Twitter extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$z, create_fragment$A, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Twitter",
			options,
			id: create_fragment$A.name
		});
	}
}

var Twitter$1 = Twitter;

/* ../../components/ui/src/icons/feather/Type.svelte generated by Svelte v3.44.2 */

const file$y = "../../components/ui/src/icons/feather/Type.svelte";

function create_fragment$z(ctx) {
	let polyline;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "4 7 4 4 20 4 20 7");
			add_location(polyline, file$y, 1, 0, 34);
			attr_dev(line0, "x1", "9");
			attr_dev(line0, "y1", "20");
			attr_dev(line0, "x2", "15");
			attr_dev(line0, "y2", "20");
			add_location(line0, file$y, 1, 48, 82);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "4");
			attr_dev(line1, "x2", "12");
			attr_dev(line1, "y2", "20");
			add_location(line1, file$y, 1, 92, 126);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$y($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Type', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Type> was created with unknown prop '${key}'`);
	});

	return [];
}

class Type extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$y, create_fragment$z, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Type",
			options,
			id: create_fragment$z.name
		});
	}
}

var Type$1 = Type;

/* ../../components/ui/src/icons/feather/Umbrella.svelte generated by Svelte v3.44.2 */

const file$x = "../../components/ui/src/icons/feather/Umbrella.svelte";

function create_fragment$y(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7");
			add_location(path, file$x, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$x($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Umbrella', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Umbrella> was created with unknown prop '${key}'`);
	});

	return [];
}

class Umbrella extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$x, create_fragment$y, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Umbrella",
			options,
			id: create_fragment$y.name
		});
	}
}

var Umbrella$1 = Umbrella;

/* ../../components/ui/src/icons/feather/Underline.svelte generated by Svelte v3.44.2 */

const file$w = "../../components/ui/src/icons/feather/Underline.svelte";

function create_fragment$x(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3");
			add_location(path, file$w, 1, 0, 34);
			attr_dev(line, "x1", "4");
			attr_dev(line, "y1", "21");
			attr_dev(line, "x2", "20");
			attr_dev(line, "y2", "21");
			add_location(line, file$w, 1, 54, 88);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$x.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$w($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Underline', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Underline> was created with unknown prop '${key}'`);
	});

	return [];
}

class Underline extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$w, create_fragment$x, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Underline",
			options,
			id: create_fragment$x.name
		});
	}
}

var Underline$1 = Underline;

/* ../../components/ui/src/icons/feather/Unlock.svelte generated by Svelte v3.44.2 */

const file$v = "../../components/ui/src/icons/feather/Unlock.svelte";

function create_fragment$w(ctx) {
	let rect;
	let path;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "11");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "11");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$v, 1, 0, 34);
			attr_dev(path, "d", "M7 11V7a5 5 0 0 1 9.9-1");
			add_location(path, file$v, 1, 63, 97);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$w.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$v($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Unlock', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Unlock> was created with unknown prop '${key}'`);
	});

	return [];
}

class Unlock extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$v, create_fragment$w, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Unlock",
			options,
			id: create_fragment$w.name
		});
	}
}

var Unlock$1 = Unlock;

/* ../../components/ui/src/icons/feather/UploadCloud.svelte generated by Svelte v3.44.2 */

const file$u = "../../components/ui/src/icons/feather/UploadCloud.svelte";

function create_fragment$v(ctx) {
	let polyline0;
	let line;
	let path;
	let polyline1;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			line = svg_element("line");
			path = svg_element("path");
			polyline1 = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "16 16 12 12 8 16");
			add_location(polyline0, file$u, 1, 0, 34);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "21");
			add_location(line, file$u, 1, 47, 81);
			attr_dev(path, "d", "M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3");
			add_location(path, file$u, 1, 92, 126);
			attr_dev(polyline1, "points", "16 16 12 12 8 16");
			add_location(polyline1, file$u, 1, 160, 194);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, line, anchor);
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polyline1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(line);
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polyline1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$v.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$u($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('UploadCloud', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UploadCloud> was created with unknown prop '${key}'`);
	});

	return [];
}

class UploadCloud extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$u, create_fragment$v, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UploadCloud",
			options,
			id: create_fragment$v.name
		});
	}
}

var UploadCloud$1 = UploadCloud;

/* ../../components/ui/src/icons/feather/Upload.svelte generated by Svelte v3.44.2 */

const file$t = "../../components/ui/src/icons/feather/Upload.svelte";

function create_fragment$u(ctx) {
	let path;
	let polyline;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4");
			add_location(path, file$t, 1, 0, 34);
			attr_dev(polyline, "points", "17 8 12 3 7 8");
			add_location(polyline, file$t, 1, 59, 93);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "3");
			attr_dev(line, "x2", "12");
			attr_dev(line, "y2", "15");
			add_location(line, file$t, 1, 103, 137);
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
		block,
		id: create_fragment$u.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$t($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Upload', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Upload> was created with unknown prop '${key}'`);
	});

	return [];
}

class Upload extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$t, create_fragment$u, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Upload",
			options,
			id: create_fragment$u.name
		});
	}
}

var Upload$1 = Upload;

/* ../../components/ui/src/icons/feather/UserCheck.svelte generated by Svelte v3.44.2 */

const file$s = "../../components/ui/src/icons/feather/UserCheck.svelte";

function create_fragment$t(ctx) {
	let path;
	let circle;
	let polyline;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2");
			add_location(path, file$s, 1, 0, 34);
			attr_dev(circle, "cx", "8.5");
			attr_dev(circle, "cy", "7");
			attr_dev(circle, "r", "4");
			add_location(circle, file$s, 1, 59, 93);
			attr_dev(polyline, "points", "17 11 19 13 23 9");
			add_location(polyline, file$s, 1, 98, 132);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$t.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$s($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('UserCheck', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserCheck> was created with unknown prop '${key}'`);
	});

	return [];
}

class UserCheck extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$s, create_fragment$t, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UserCheck",
			options,
			id: create_fragment$t.name
		});
	}
}

var UserCheck$1 = UserCheck;

/* ../../components/ui/src/icons/feather/UserMinus.svelte generated by Svelte v3.44.2 */

const file$r = "../../components/ui/src/icons/feather/UserMinus.svelte";

function create_fragment$s(ctx) {
	let path;
	let circle;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle = svg_element("circle");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2");
			add_location(path, file$r, 1, 0, 34);
			attr_dev(circle, "cx", "8.5");
			attr_dev(circle, "cy", "7");
			attr_dev(circle, "r", "4");
			add_location(circle, file$r, 1, 59, 93);
			attr_dev(line, "x1", "23");
			attr_dev(line, "y1", "11");
			attr_dev(line, "x2", "17");
			attr_dev(line, "y2", "11");
			add_location(line, file$r, 1, 98, 132);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$s.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$r($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('UserMinus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserMinus> was created with unknown prop '${key}'`);
	});

	return [];
}

class UserMinus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$r, create_fragment$s, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UserMinus",
			options,
			id: create_fragment$s.name
		});
	}
}

var UserMinus$1 = UserMinus;

/* ../../components/ui/src/icons/feather/UserPlus.svelte generated by Svelte v3.44.2 */

const file$q = "../../components/ui/src/icons/feather/UserPlus.svelte";

function create_fragment$r(ctx) {
	let path;
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2");
			add_location(path, file$q, 1, 0, 34);
			attr_dev(circle, "cx", "8.5");
			attr_dev(circle, "cy", "7");
			attr_dev(circle, "r", "4");
			add_location(circle, file$q, 1, 59, 93);
			attr_dev(line0, "x1", "20");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "20");
			attr_dev(line0, "y2", "14");
			add_location(line0, file$q, 1, 98, 132);
			attr_dev(line1, "x1", "23");
			attr_dev(line1, "y1", "11");
			attr_dev(line1, "x2", "17");
			attr_dev(line1, "y2", "11");
			add_location(line1, file$q, 1, 142, 176);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$r.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$q($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('UserPlus', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserPlus> was created with unknown prop '${key}'`);
	});

	return [];
}

class UserPlus extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$q, create_fragment$r, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UserPlus",
			options,
			id: create_fragment$r.name
		});
	}
}

var UserPlus$1 = UserPlus;

/* ../../components/ui/src/icons/feather/UserX.svelte generated by Svelte v3.44.2 */

const file$p = "../../components/ui/src/icons/feather/UserX.svelte";

function create_fragment$q(ctx) {
	let path;
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2");
			add_location(path, file$p, 1, 0, 34);
			attr_dev(circle, "cx", "8.5");
			attr_dev(circle, "cy", "7");
			attr_dev(circle, "r", "4");
			add_location(circle, file$p, 1, 59, 93);
			attr_dev(line0, "x1", "18");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "23");
			attr_dev(line0, "y2", "13");
			add_location(line0, file$p, 1, 98, 132);
			attr_dev(line1, "x1", "23");
			attr_dev(line1, "y1", "8");
			attr_dev(line1, "x2", "18");
			attr_dev(line1, "y2", "13");
			add_location(line1, file$p, 1, 142, 176);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$p($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('UserX', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserX> was created with unknown prop '${key}'`);
	});

	return [];
}

class UserX extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$p, create_fragment$q, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UserX",
			options,
			id: create_fragment$q.name
		});
	}
}

var UserX$1 = UserX;

/* ../../components/ui/src/icons/feather/User.svelte generated by Svelte v3.44.2 */

const file$o = "../../components/ui/src/icons/feather/User.svelte";

function create_fragment$p(ctx) {
	let path;
	let circle;

	const block = {
		c: function create() {
			path = svg_element("path");
			circle = svg_element("circle");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2");
			add_location(path, file$o, 1, 0, 34);
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "7");
			attr_dev(circle, "r", "4");
			add_location(circle, file$o, 1, 59, 93);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, circle, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(circle);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$p.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$o($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('User', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<User> was created with unknown prop '${key}'`);
	});

	return [];
}

class User extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$o, create_fragment$p, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "User",
			options,
			id: create_fragment$p.name
		});
	}
}

var User$1 = User;

/* ../../components/ui/src/icons/feather/Users.svelte generated by Svelte v3.44.2 */

const file$n = "../../components/ui/src/icons/feather/Users.svelte";

function create_fragment$o(ctx) {
	let path0;
	let circle;
	let path1;
	let path2;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			circle = svg_element("circle");
			path1 = svg_element("path");
			path2 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			path2 = claim_svg_element(nodes, "path", { d: true });
			children(path2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2");
			add_location(path0, file$n, 1, 0, 34);
			attr_dev(circle, "cx", "9");
			attr_dev(circle, "cy", "7");
			attr_dev(circle, "r", "4");
			add_location(circle, file$n, 1, 59, 93);
			attr_dev(path1, "d", "M23 21v-2a4 4 0 0 0-3-3.87");
			add_location(path1, file$n, 1, 96, 130);
			attr_dev(path2, "d", "M16 3.13a4 4 0 0 1 0 7.75");
			add_location(path2, file$n, 1, 140, 174);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, path2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(path2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$o.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$n($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Users', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Users> was created with unknown prop '${key}'`);
	});

	return [];
}

class Users extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$n, create_fragment$o, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Users",
			options,
			id: create_fragment$o.name
		});
	}
}

var Users$1 = Users;

/* ../../components/ui/src/icons/feather/VideoOff.svelte generated by Svelte v3.44.2 */

const file$m = "../../components/ui/src/icons/feather/VideoOff.svelte";

function create_fragment$n(ctx) {
	let path;
	let line;

	const block = {
		c: function create() {
			path = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10");
			add_location(path, file$m, 1, 0, 34);
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "23");
			add_location(line, file$m, 1, 115, 149);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$m($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('VideoOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VideoOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class VideoOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$m, create_fragment$n, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "VideoOff",
			options,
			id: create_fragment$n.name
		});
	}
}

var VideoOff$1 = VideoOff;

/* ../../components/ui/src/icons/feather/Video.svelte generated by Svelte v3.44.2 */

const file$l = "../../components/ui/src/icons/feather/Video.svelte";

function create_fragment$m(ctx) {
	let polygon;
	let rect;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);

			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "23 7 16 12 23 17 23 7");
			add_location(polygon, file$l, 1, 0, 34);
			attr_dev(rect, "x", "1");
			attr_dev(rect, "y", "5");
			attr_dev(rect, "width", "15");
			attr_dev(rect, "height", "14");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$l, 1, 50, 84);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, rect, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$l($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Video', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Video> was created with unknown prop '${key}'`);
	});

	return [];
}

class Video extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$l, create_fragment$m, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Video",
			options,
			id: create_fragment$m.name
		});
	}
}

var Video$1 = Video;

/* ../../components/ui/src/icons/feather/Voicemail.svelte generated by Svelte v3.44.2 */

const file$k = "../../components/ui/src/icons/feather/Voicemail.svelte";

function create_fragment$l(ctx) {
	let circle0;
	let circle1;
	let line;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			circle1 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle1).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "5.5");
			attr_dev(circle0, "cy", "11.5");
			attr_dev(circle0, "r", "4.5");
			add_location(circle0, file$k, 1, 0, 34);
			attr_dev(circle1, "cx", "18.5");
			attr_dev(circle1, "cy", "11.5");
			attr_dev(circle1, "r", "4.5");
			add_location(circle1, file$k, 1, 44, 78);
			attr_dev(line, "x1", "5.5");
			attr_dev(line, "y1", "16");
			attr_dev(line, "x2", "18.5");
			attr_dev(line, "y2", "16");
			add_location(line, file$k, 1, 89, 123);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$k($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Voicemail', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Voicemail> was created with unknown prop '${key}'`);
	});

	return [];
}

class Voicemail extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$k, create_fragment$l, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Voicemail",
			options,
			id: create_fragment$l.name
		});
	}
}

var Voicemail$1 = Voicemail;

/* ../../components/ui/src/icons/feather/Volume1.svelte generated by Svelte v3.44.2 */

const file$j = "../../components/ui/src/icons/feather/Volume1.svelte";

function create_fragment$k(ctx) {
	let polygon;
	let path;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "11 5 6 9 2 9 2 15 6 15 11 19 11 5");
			add_location(polygon, file$j, 1, 0, 34);
			attr_dev(path, "d", "M15.54 8.46a5 5 0 0 1 0 7.07");
			add_location(path, file$j, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$j($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Volume1', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Volume1> was created with unknown prop '${key}'`);
	});

	return [];
}

class Volume1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$j, create_fragment$k, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Volume1",
			options,
			id: create_fragment$k.name
		});
	}
}

var Volume1$1 = Volume1;

/* ../../components/ui/src/icons/feather/Volume2.svelte generated by Svelte v3.44.2 */

const file$i = "../../components/ui/src/icons/feather/Volume2.svelte";

function create_fragment$j(ctx) {
	let polygon;
	let path;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "11 5 6 9 2 9 2 15 6 15 11 19 11 5");
			add_location(polygon, file$i, 1, 0, 34);
			attr_dev(path, "d", "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07");
			add_location(path, file$i, 1, 62, 96);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$i($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Volume2', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Volume2> was created with unknown prop '${key}'`);
	});

	return [];
}

class Volume2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$i, create_fragment$j, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Volume2",
			options,
			id: create_fragment$j.name
		});
	}
}

var Volume2$1 = Volume2;

/* ../../components/ui/src/icons/feather/VolumeX.svelte generated by Svelte v3.44.2 */

const file$h = "../../components/ui/src/icons/feather/VolumeX.svelte";

function create_fragment$i(ctx) {
	let polygon;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "11 5 6 9 2 9 2 15 6 15 11 19 11 5");
			add_location(polygon, file$h, 1, 0, 34);
			attr_dev(line0, "x1", "23");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "17");
			attr_dev(line0, "y2", "15");
			add_location(line0, file$h, 1, 62, 96);
			attr_dev(line1, "x1", "17");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "23");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$h, 1, 106, 140);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('VolumeX', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VolumeX> was created with unknown prop '${key}'`);
	});

	return [];
}

class VolumeX extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$h, create_fragment$i, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "VolumeX",
			options,
			id: create_fragment$i.name
		});
	}
}

var VolumeX$1 = VolumeX;

/* ../../components/ui/src/icons/feather/Volume.svelte generated by Svelte v3.44.2 */

const file$g = "../../components/ui/src/icons/feather/Volume.svelte";

function create_fragment$h(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "11 5 6 9 2 9 2 15 6 15 11 19 11 5");
			add_location(polygon, file$g, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Volume', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Volume> was created with unknown prop '${key}'`);
	});

	return [];
}

class Volume extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$g, create_fragment$h, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Volume",
			options,
			id: create_fragment$h.name
		});
	}
}

var Volume$1 = Volume;

/* ../../components/ui/src/icons/feather/Watch.svelte generated by Svelte v3.44.2 */

const file$f = "../../components/ui/src/icons/feather/Watch.svelte";

function create_fragment$g(ctx) {
	let circle;
	let polyline;
	let path;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "7");
			add_location(circle, file$f, 1, 0, 34);
			attr_dev(polyline, "points", "12 9 12 12 13.5 13.5");
			add_location(polyline, file$f, 1, 39, 73);
			attr_dev(path, "d", "M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83");
			add_location(path, file$f, 1, 90, 124);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Watch', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Watch> was created with unknown prop '${key}'`);
	});

	return [];
}

class Watch extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$f, create_fragment$g, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Watch",
			options,
			id: create_fragment$g.name
		});
	}
}

var Watch$1 = Watch;

/* ../../components/ui/src/icons/feather/WifiOff.svelte generated by Svelte v3.44.2 */

const file$e = "../../components/ui/src/icons/feather/WifiOff.svelte";

function create_fragment$f(ctx) {
	let line0;
	let path0;
	let path1;
	let path2;
	let path3;
	let path4;
	let line1;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			path4 = svg_element("path");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			path2 = claim_svg_element(nodes, "path", { d: true });
			children(path2).forEach(detach_dev);
			path3 = claim_svg_element(nodes, "path", { d: true });
			children(path3).forEach(detach_dev);
			path4 = claim_svg_element(nodes, "path", { d: true });
			children(path4).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "1");
			attr_dev(line0, "y1", "1");
			attr_dev(line0, "x2", "23");
			attr_dev(line0, "y2", "23");
			add_location(line0, file$e, 1, 0, 34);
			attr_dev(path0, "d", "M16.72 11.06A10.94 10.94 0 0 1 19 12.55");
			add_location(path0, file$e, 1, 43, 77);
			attr_dev(path1, "d", "M5 12.55a10.94 10.94 0 0 1 5.17-2.39");
			add_location(path1, file$e, 1, 100, 134);
			attr_dev(path2, "d", "M10.71 5.05A16 16 0 0 1 22.58 9");
			add_location(path2, file$e, 1, 154, 188);
			attr_dev(path3, "d", "M1.42 9a15.91 15.91 0 0 1 4.7-2.88");
			add_location(path3, file$e, 1, 203, 237);
			attr_dev(path4, "d", "M8.53 16.11a6 6 0 0 1 6.95 0");
			add_location(path4, file$e, 1, 255, 289);
			attr_dev(line1, "x1", "12");
			attr_dev(line1, "y1", "20");
			attr_dev(line1, "x2", "12.01");
			attr_dev(line1, "y2", "20");
			add_location(line1, file$e, 1, 301, 335);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, path2, anchor);
			insert_hydration_dev(target, path3, anchor);
			insert_hydration_dev(target, path4, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(path2);
			if (detaching) detach_dev(path3);
			if (detaching) detach_dev(path4);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('WifiOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WifiOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class WifiOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$e, create_fragment$f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "WifiOff",
			options,
			id: create_fragment$f.name
		});
	}
}

var WifiOff$1 = WifiOff;

/* ../../components/ui/src/icons/feather/Wifi.svelte generated by Svelte v3.44.2 */

const file$d = "../../components/ui/src/icons/feather/Wifi.svelte";

function create_fragment$e(ctx) {
	let path0;
	let path1;
	let path2;
	let line;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_svg_element(nodes, "path", { d: true });
			children(path0).forEach(detach_dev);
			path1 = claim_svg_element(nodes, "path", { d: true });
			children(path1).forEach(detach_dev);
			path2 = claim_svg_element(nodes, "path", { d: true });
			children(path2).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M5 12.55a11 11 0 0 1 14.08 0");
			add_location(path0, file$d, 1, 0, 34);
			attr_dev(path1, "d", "M1.42 9a16 16 0 0 1 21.16 0");
			add_location(path1, file$d, 1, 46, 80);
			attr_dev(path2, "d", "M8.53 16.11a6 6 0 0 1 6.95 0");
			add_location(path2, file$d, 1, 91, 125);
			attr_dev(line, "x1", "12");
			attr_dev(line, "y1", "20");
			attr_dev(line, "x2", "12.01");
			attr_dev(line, "y2", "20");
			add_location(line, file$d, 1, 137, 171);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path0, anchor);
			insert_hydration_dev(target, path1, anchor);
			insert_hydration_dev(target, path2, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
			if (detaching) detach_dev(path2);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Wifi', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wifi> was created with unknown prop '${key}'`);
	});

	return [];
}

class Wifi extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$d, create_fragment$e, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Wifi",
			options,
			id: create_fragment$e.name
		});
	}
}

var Wifi$1 = Wifi;

/* ../../components/ui/src/icons/feather/Wind.svelte generated by Svelte v3.44.2 */

const file$c = "../../components/ui/src/icons/feather/Wind.svelte";

function create_fragment$d(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2");
			add_location(path, file$c, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Wind', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wind> was created with unknown prop '${key}'`);
	});

	return [];
}

class Wind extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$c, create_fragment$d, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Wind",
			options,
			id: create_fragment$d.name
		});
	}
}

var Wind$1 = Wind;

/* ../../components/ui/src/icons/feather/XCircle.svelte generated by Svelte v3.44.2 */

const file$b = "../../components/ui/src/icons/feather/XCircle.svelte";

function create_fragment$c(ctx) {
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$b, 1, 0, 34);
			attr_dev(line0, "x1", "15");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "9");
			attr_dev(line0, "y2", "15");
			add_location(line0, file$b, 1, 40, 74);
			attr_dev(line1, "x1", "9");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "15");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$b, 1, 83, 117);
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
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('XCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<XCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class XCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$b, create_fragment$c, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "XCircle",
			options,
			id: create_fragment$c.name
		});
	}
}

var XCircle$1 = XCircle;

/* ../../components/ui/src/icons/feather/XOctagon.svelte generated by Svelte v3.44.2 */

const file$a = "../../components/ui/src/icons/feather/XOctagon.svelte";

function create_fragment$b(ctx) {
	let polygon;
	let line0;
	let line1;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2");
			add_location(polygon, file$a, 1, 0, 34);
			attr_dev(line0, "x1", "15");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "9");
			attr_dev(line0, "y2", "15");
			add_location(line0, file$a, 1, 99, 133);
			attr_dev(line1, "x1", "9");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "15");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$a, 1, 142, 176);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('XOctagon', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<XOctagon> was created with unknown prop '${key}'`);
	});

	return [];
}

class XOctagon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$a, create_fragment$b, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "XOctagon",
			options,
			id: create_fragment$b.name
		});
	}
}

var XOctagon$1 = XOctagon;

/* ../../components/ui/src/icons/feather/XSquare.svelte generated by Svelte v3.44.2 */

const file$9 = "../../components/ui/src/icons/feather/XSquare.svelte";

function create_fragment$a(ctx) {
	let rect;
	let line0;
	let line1;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_svg_element(nodes, "rect", {
				x: true,
				y: true,
				width: true,
				height: true,
				rx: true,
				ry: true
			});

			children(rect).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$9, 1, 0, 34);
			attr_dev(line0, "x1", "9");
			attr_dev(line0, "y1", "9");
			attr_dev(line0, "x2", "15");
			attr_dev(line0, "y2", "15");
			add_location(line0, file$9, 1, 62, 96);
			attr_dev(line1, "x1", "15");
			attr_dev(line1, "y1", "9");
			attr_dev(line1, "x2", "9");
			attr_dev(line1, "y2", "15");
			add_location(line1, file$9, 1, 105, 139);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, rect, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('XSquare', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<XSquare> was created with unknown prop '${key}'`);
	});

	return [];
}

class XSquare extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$9, create_fragment$a, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "XSquare",
			options,
			id: create_fragment$a.name
		});
	}
}

var XSquare$1 = XSquare;

/* ../../components/ui/src/icons/feather/X.svelte generated by Svelte v3.44.2 */

const file$8 = "../../components/ui/src/icons/feather/X.svelte";

function create_fragment$9(ctx) {
	let line0;
	let line1;

	const block = {
		c: function create() {
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line0, "x1", "18");
			attr_dev(line0, "y1", "6");
			attr_dev(line0, "x2", "6");
			attr_dev(line0, "y2", "18");
			add_location(line0, file$8, 1, 0, 34);
			attr_dev(line1, "x1", "6");
			attr_dev(line1, "y1", "6");
			attr_dev(line1, "x2", "18");
			attr_dev(line1, "y2", "18");
			add_location(line1, file$8, 1, 43, 77);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('X', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<X> was created with unknown prop '${key}'`);
	});

	return [];
}

class X extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$8, create_fragment$9, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "X",
			options,
			id: create_fragment$9.name
		});
	}
}

var X$1 = X;

/* ../../components/ui/src/icons/feather/Youtube.svelte generated by Svelte v3.44.2 */

const file$7 = "../../components/ui/src/icons/feather/Youtube.svelte";

function create_fragment$8(ctx) {
	let path;
	let polygon;

	const block = {
		c: function create() {
			path = svg_element("path");
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z");
			add_location(path, file$7, 1, 0, 34);
			attr_dev(polygon, "points", "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02");
			add_location(polygon, file$7, 1, 275, 309);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Youtube', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Youtube> was created with unknown prop '${key}'`);
	});

	return [];
}

class Youtube extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$7, create_fragment$8, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Youtube",
			options,
			id: create_fragment$8.name
		});
	}
}

var Youtube$1 = Youtube;

/* ../../components/ui/src/icons/feather/ZapOff.svelte generated by Svelte v3.44.2 */

const file$6 = "../../components/ui/src/icons/feather/ZapOff.svelte";

function create_fragment$7(ctx) {
	let polyline0;
	let polyline1;
	let polyline2;
	let line;

	const block = {
		c: function create() {
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			polyline2 = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			polyline0 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline0).forEach(detach_dev);
			polyline1 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline1).forEach(detach_dev);
			polyline2 = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline2).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline0, "points", "12.41 6.75 13 2 10.57 4.92");
			add_location(polyline0, file$6, 1, 0, 34);
			attr_dev(polyline1, "points", "18.57 12.91 21 10 15.66 10");
			add_location(polyline1, file$6, 1, 57, 91);
			attr_dev(polyline2, "points", "8 8 3 14 12 14 11 22 16 16");
			add_location(polyline2, file$6, 1, 114, 148);
			attr_dev(line, "x1", "1");
			attr_dev(line, "y1", "1");
			attr_dev(line, "x2", "23");
			attr_dev(line, "y2", "23");
			add_location(line, file$6, 1, 171, 205);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline0, anchor);
			insert_hydration_dev(target, polyline1, anchor);
			insert_hydration_dev(target, polyline2, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline0);
			if (detaching) detach_dev(polyline1);
			if (detaching) detach_dev(polyline2);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ZapOff', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ZapOff> was created with unknown prop '${key}'`);
	});

	return [];
}

class ZapOff extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$7, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ZapOff",
			options,
			id: create_fragment$7.name
		});
	}
}

var ZapOff$1 = ZapOff;

/* ../../components/ui/src/icons/feather/Zap.svelte generated by Svelte v3.44.2 */

const file$5 = "../../components/ui/src/icons/feather/Zap.svelte";

function create_fragment$6(ctx) {
	let polygon;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_svg_element(nodes, "polygon", { points: true });
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "points", "13 2 3 14 12 14 11 22 21 10 12 10 13 2");
			add_location(polygon, file$5, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polygon, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Zap', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Zap> was created with unknown prop '${key}'`);
	});

	return [];
}

class Zap extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$6, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Zap",
			options,
			id: create_fragment$6.name
		});
	}
}

var Zap$1 = Zap;

/* ../../components/ui/src/icons/feather/ZoomIn.svelte generated by Svelte v3.44.2 */

const file$4 = "../../components/ui/src/icons/feather/ZoomIn.svelte";

function create_fragment$5(ctx) {
	let circle;
	let line0;
	let line1;
	let line2;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			line2 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line2).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "11");
			attr_dev(circle, "cy", "11");
			attr_dev(circle, "r", "8");
			add_location(circle, file$4, 1, 0, 34);
			attr_dev(line0, "x1", "21");
			attr_dev(line0, "y1", "21");
			attr_dev(line0, "x2", "16.65");
			attr_dev(line0, "y2", "16.65");
			add_location(line0, file$4, 1, 39, 73);
			attr_dev(line1, "x1", "11");
			attr_dev(line1, "y1", "8");
			attr_dev(line1, "x2", "11");
			attr_dev(line1, "y2", "14");
			add_location(line1, file$4, 1, 90, 124);
			attr_dev(line2, "x1", "8");
			attr_dev(line2, "y1", "11");
			attr_dev(line2, "x2", "14");
			attr_dev(line2, "y2", "11");
			add_location(line2, file$4, 1, 134, 168);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
			insert_hydration_dev(target, line2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
			if (detaching) detach_dev(line2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ZoomIn', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ZoomIn> was created with unknown prop '${key}'`);
	});

	return [];
}

class ZoomIn extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$5, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ZoomIn",
			options,
			id: create_fragment$5.name
		});
	}
}

var ZoomIn$1 = ZoomIn;

/* ../../components/ui/src/icons/feather/ZoomOut.svelte generated by Svelte v3.44.2 */

const file$3 = "../../components/ui/src/icons/feather/ZoomOut.svelte";

function create_fragment$4(ctx) {
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "11");
			attr_dev(circle, "cy", "11");
			attr_dev(circle, "r", "8");
			add_location(circle, file$3, 1, 0, 34);
			attr_dev(line0, "x1", "21");
			attr_dev(line0, "y1", "21");
			attr_dev(line0, "x2", "16.65");
			attr_dev(line0, "y2", "16.65");
			add_location(line0, file$3, 1, 39, 73);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "11");
			attr_dev(line1, "x2", "14");
			attr_dev(line1, "y2", "11");
			add_location(line1, file$3, 1, 90, 124);
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
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ZoomOut', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ZoomOut> was created with unknown prop '${key}'`);
	});

	return [];
}

class ZoomOut extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ZoomOut",
			options,
			id: create_fragment$4.name
		});
	}
}

var ZoomOut$1 = ZoomOut;

/* ../../components/ui/src/MultiBanner.svelte generated by Svelte v3.44.2 */
const file$2 = "../../components/ui/src/MultiBanner.svelte";

// (26:0) {#if isActive}
function create_if_block$1(ctx) {
	let div2;
	let div1;
	let div0;
	let switch_instance;
	let t;
	let button;
	let icon;
	let div2_class_value;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*components*/ ctx[2]?.[/*currentIndex*/ ctx[0]];

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	icon = new Icon({
			props: { glyph: XCircle$1 },
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t = space();
			button = element("button");
			create_component(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", {
				"aria-label": true,
				class: true,
				role: true
			});

			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if (switch_instance) claim_component(switch_instance.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(div1_nodes);
			button = claim_element(div1_nodes, "BUTTON", { "aria-label": true, class: true });
			var button_nodes = children(button);
			claim_component(icon.$$.fragment, button_nodes);
			button_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "content svelte-8odsp2");
			add_location(div0, file$2, 32, 3, 548);
			attr_dev(button, "aria-label", "Close banner");
			attr_dev(button, "class", "clickable svelte-8odsp2");
			add_location(button, file$2, 35, 3, 642);
			attr_dev(div1, "class", "inner svelte-8odsp2");
			add_location(div1, file$2, 31, 2, 525);
			attr_dev(div2, "aria-label", "Banner");
			attr_dev(div2, "class", div2_class_value = "Banner " + /*$_screen*/ ctx[4]?.classes + " svelte-8odsp2");
			attr_dev(div2, "role", "alert");
			add_location(div2, file$2, 26, 1, 441);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div2, anchor);
			append_hydration_dev(div2, div1);
			append_hydration_dev(div1, div0);

			if (switch_instance) {
				mount_component(switch_instance, div0, null);
			}

			append_hydration_dev(div1, t);
			append_hydration_dev(div1, button);
			mount_component(icon, button, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*next*/ ctx[5], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = /*components*/ ctx[2]?.[/*currentIndex*/ ctx[0]])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div0, null);
				} else {
					switch_instance = null;
				}
			}

			if (!current || dirty & /*$_screen*/ 16 && div2_class_value !== (div2_class_value = "Banner " + /*$_screen*/ ctx[4]?.classes + " svelte-8odsp2")) {
				attr_dev(div2, "class", div2_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if (switch_instance) destroy_component(switch_instance);
			destroy_component(icon);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(26:0) {#if isActive}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*isActive*/ ctx[3] && create_if_block$1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*isActive*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isActive*/ 8) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
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
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let $_screen,
		$$unsubscribe__screen = noop,
		$$subscribe__screen = () => ($$unsubscribe__screen(), $$unsubscribe__screen = subscribe(_screen, $$value => $$invalidate(4, $_screen = $$value)), _screen);

	$$self.$$.on_destroy.push(() => $$unsubscribe__screen());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MultiBanner', slots, []);
	let { _screen } = $$props;
	validate_store(_screen, '_screen');
	$$subscribe__screen();
	let { components } = $$props;
	let { currentIndex } = $$props;
	let isActive = false;

	function init() {
		$$invalidate(0, currentIndex = 0);
		$$invalidate(3, isActive = true);
	}

	function next() {
		$$invalidate(0, currentIndex++, currentIndex);

		if (currentIndex >= components.length) {
			$$invalidate(3, isActive = false);
		}
	}

	const writable_props = ['_screen', 'components', 'currentIndex'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MultiBanner> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('_screen' in $$props) $$subscribe__screen($$invalidate(1, _screen = $$props._screen));
		if ('components' in $$props) $$invalidate(2, components = $$props.components);
		if ('currentIndex' in $$props) $$invalidate(0, currentIndex = $$props.currentIndex);
	};

	$$self.$capture_state = () => ({
		Icon,
		XCircle: XCircle$1,
		_screen,
		components,
		currentIndex,
		isActive,
		init,
		next,
		$_screen
	});

	$$self.$inject_state = $$props => {
		if ('_screen' in $$props) $$subscribe__screen($$invalidate(1, _screen = $$props._screen));
		if ('components' in $$props) $$invalidate(2, components = $$props.components);
		if ('currentIndex' in $$props) $$invalidate(0, currentIndex = $$props.currentIndex);
		if ('isActive' in $$props) $$invalidate(3, isActive = $$props.isActive);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*components*/ 4) {
			components?.length > 0 && init();
		}
	};

	return [currentIndex, _screen, components, isActive, $_screen, next];
}

class MultiBanner extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$2, create_fragment$3, safe_not_equal, {
			_screen: 1,
			components: 2,
			currentIndex: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MultiBanner",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*_screen*/ ctx[1] === undefined && !('_screen' in props)) {
			console.warn("<MultiBanner> was created without expected prop '_screen'");
		}

		if (/*components*/ ctx[2] === undefined && !('components' in props)) {
			console.warn("<MultiBanner> was created without expected prop 'components'");
		}

		if (/*currentIndex*/ ctx[0] === undefined && !('currentIndex' in props)) {
			console.warn("<MultiBanner> was created without expected prop 'currentIndex'");
		}
	}

	get _screen() {
		throw new Error("<MultiBanner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _screen(value) {
		throw new Error("<MultiBanner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get components() {
		throw new Error("<MultiBanner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set components(value) {
		throw new Error("<MultiBanner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get currentIndex() {
		throw new Error("<MultiBanner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set currentIndex(value) {
		throw new Error("<MultiBanner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var MultiBanner$1 = MultiBanner;

/* ../../components/ui/src/NoScript.svelte generated by Svelte v3.44.2 */

function create_fragment$2(ctx) {
	const block = {
		c: noop,
		l: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('NoScript', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NoScript> was created with unknown prop '${key}'`);
	});

	return [];
}

class NoScript extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "NoScript",
			options,
			id: create_fragment$2.name
		});
	}
}

var NoScript$1 = NoScript;

/* ../../components/ui/src/ResponsiveFlex.svelte generated by Svelte v3.44.2 */
const file$1 = "../../components/ui/src/ResponsiveFlex.svelte";

function create_fragment$1(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (default_slot) default_slot.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", div_class_value = "ResponsiveFlex " + /*$_screen*/ ctx[0]?.classes + " svelte-1tya6p1");
			add_location(div, file$1, 4, 0, 83);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*$_screen*/ 1 && div_class_value !== (div_class_value = "ResponsiveFlex " + /*$_screen*/ ctx[0]?.classes + " svelte-1tya6p1")) {
				attr_dev(div, "class", div_class_value);
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
			if (detaching) detach_dev(div);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $_screen;
	validate_store(_screen, '_screen');
	component_subscribe($$self, _screen, $$value => $$invalidate(0, $_screen = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ResponsiveFlex', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ResponsiveFlex> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ _screen, $_screen });
	return [$_screen, $$scope, slots];
}

class ResponsiveFlex extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ResponsiveFlex",
			options,
			id: create_fragment$1.name
		});
	}
}

var ResponsiveFlex$1 = ResponsiveFlex;

var ui = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Link: Link,
  LinkButton: LinkButton,
  LoadingView: LoadingView,
  MessageView: MessageView,
  MultiBanner: MultiBanner$1,
  NoScript: NoScript$1,
  ResponsiveFlex: ResponsiveFlex$1,
  Switch: Switch,
  Icon: Icon,
  Activity: Activity,
  Airplay: Airplay$1,
  AlertCircle: AlertCircle$1,
  AlertOctagon: AlertOctagon$1,
  AlertTriangle: AlertTriangle,
  AlignCenter: AlignCenter$1,
  AlignJustify: AlignJustify$1,
  AlignLeft: AlignLeft$1,
  AlignRight: AlignRight$1,
  Anchor: Anchor$1,
  Aperture: Aperture$1,
  Archive: Archive$1,
  ArrowDownCircle: ArrowDownCircle$1,
  ArrowDownLeft: ArrowDownLeft$1,
  ArrowDownRight: ArrowDownRight$1,
  ArrowDown: ArrowDown$1,
  ArrowLeftCircle: ArrowLeftCircle,
  ArrowLeft: ArrowLeft$1,
  ArrowRightCircle: ArrowRightCircle,
  ArrowRight: ArrowRight$1,
  ArrowUpCircle: ArrowUpCircle$1,
  ArrowUpLeft: ArrowUpLeft$1,
  ArrowUpRight: ArrowUpRight$1,
  ArrowUp: ArrowUp$1,
  AtSign: AtSign$1,
  Award: Award$1,
  BarChart2: BarChart2$1,
  BarChart: BarChart,
  BatteryCharging: BatteryCharging$1,
  Battery: Battery$1,
  BellOff: BellOff$1,
  Bell: Bell$1,
  Bluetooth: Bluetooth$1,
  Bold: Bold$1,
  BookOpen: BookOpen$1,
  Book: Book$1,
  Bookmark: Bookmark$1,
  Box: Box$1,
  Briefcase: Briefcase$1,
  Calendar: Calendar$1,
  CameraOff: CameraOff$1,
  Camera: Camera$1,
  Cast: Cast$1,
  CheckCircle: CheckCircle$1,
  CheckSquare: CheckSquare,
  Check: Check$1,
  ChevronDown: ChevronDown,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  ChevronUp: ChevronUp,
  ChevronsDown: ChevronsDown$1,
  ChevronsLeft: ChevronsLeft$1,
  ChevronsRight: ChevronsRight$1,
  ChevronsUp: ChevronsUp$1,
  Chrome: Chrome$1,
  Circle: Circle$1,
  Clipboard: Clipboard$1,
  Clock: Clock,
  CloudDrizzle: CloudDrizzle$1,
  CloudLightning: CloudLightning$1,
  CloudOff: CloudOff$1,
  CloudRain: CloudRain$1,
  CloudSnow: CloudSnow$1,
  Cloud: Cloud$1,
  Code: Code$1,
  Codepen: Codepen$1,
  Codesandbox: Codesandbox$1,
  Coffee: Coffee$1,
  Columns: Columns$1,
  Command: Command$1,
  Compass: Compass$1,
  Copy: Copy$1,
  CornerDownLeft: CornerDownLeft$1,
  CornerDownRight: CornerDownRight$1,
  CornerLeftDown: CornerLeftDown$1,
  CornerLeftUp: CornerLeftUp$1,
  CornerRightDown: CornerRightDown$1,
  CornerRightUp: CornerRightUp$1,
  CornerUpLeft: CornerUpLeft$1,
  CornerUpRight: CornerUpRight$1,
  Cpu: Cpu$1,
  CreditCard: CreditCard$1,
  Crop: Crop$1,
  Crosshair: Crosshair$1,
  Database: Database$1,
  Delete: Delete$1,
  Disc: Disc$1,
  DivideCircle: DivideCircle$1,
  DivideSquare: DivideSquare$1,
  Divide: Divide$1,
  DollarSign: DollarSign$1,
  DownloadCloud: DownloadCloud$1,
  Download: Download,
  Dribbble: Dribbble$1,
  Droplet: Droplet$1,
  Edit2: Edit2$1,
  Edit3: Edit3$1,
  Edit: Edit$1,
  ExternalLink: ExternalLink,
  EyeOff: EyeOff$1,
  Eye: Eye$1,
  Facebook: Facebook$1,
  FastForward: FastForward$1,
  Feather: Feather$1,
  Figma: Figma$1,
  FileMinus: FileMinus$1,
  FilePlus: FilePlus$1,
  FileText: FileText$1,
  File: File$1,
  Film: Film$1,
  Filter: Filter$1,
  Flag: Flag$1,
  FolderMinus: FolderMinus$1,
  FolderPlus: FolderPlus$1,
  Folder: Folder$1,
  Framer: Framer$1,
  Frown: Frown$1,
  Gift: Gift$1,
  GitBranch: GitBranch$1,
  GitCommit: GitCommit$1,
  GitMerge: GitMerge$1,
  GitPullRequest: GitPullRequest$1,
  Github: Github$1,
  Gitlab: Gitlab$1,
  Globe: Globe,
  Grid: Grid$1,
  HardDrive: HardDrive$1,
  Hash: Hash$1,
  Headphones: Headphones$1,
  Heart: Heart$1,
  HelpCircle: HelpCircle$1,
  Hexagon: Hexagon$1,
  Home: Home$1,
  Image: Image$1,
  Inbox: Inbox$1,
  Info: Info,
  Instagram: Instagram$1,
  Italic: Italic$1,
  Key: Key$1,
  Layers: Layers$1,
  Layout: Layout$1,
  LifeBuoy: LifeBuoy$1,
  Link2: Link2$1,
  Linkedin: Linkedin$1,
  List: List,
  Loader: Loader,
  Lock: Lock$1,
  LogIn: LogIn$1,
  LogOut: LogOut$1,
  Mail: Mail$1,
  MapPin: MapPin,
  Map: Map$1,
  Maximize2: Maximize2$1,
  Maximize: Maximize$1,
  Meh: Meh$1,
  Menu: Menu$1,
  MessageCircle: MessageCircle$1,
  MessageSquare: MessageSquare$1,
  MicOff: MicOff$1,
  Mic: Mic$1,
  Minimize2: Minimize2$1,
  Minimize: Minimize$1,
  MinusCircle: MinusCircle,
  MinusSquare: MinusSquare,
  Minus: Minus$1,
  Monitor: Monitor$1,
  Moon: Moon$1,
  MoreHorizontal: MoreHorizontal$1,
  MoreVertical: MoreVertical$1,
  MousePointer: MousePointer$1,
  Move: Move$1,
  Music: Music$1,
  Navigation2: Navigation2$1,
  Navigation: Navigation$1,
  Octagon: Octagon$1,
  Package: Package$1,
  Paperclip: Paperclip$1,
  PauseCircle: PauseCircle$1,
  Pause: Pause$1,
  PenTool: PenTool$1,
  Percent: Percent$1,
  PhoneCall: PhoneCall$1,
  PhoneForwarded: PhoneForwarded$1,
  PhoneIncoming: PhoneIncoming$1,
  PhoneMissed: PhoneMissed$1,
  PhoneOff: PhoneOff$1,
  PhoneOutgoing: PhoneOutgoing$1,
  Phone: Phone$1,
  PieChart: PieChart$1,
  PlayCircle: PlayCircle$1,
  Play: Play$1,
  PlusCircle: PlusCircle,
  PlusSquare: PlusSquare$1,
  Plus: Plus$1,
  Pocket: Pocket$1,
  Power: Power$1,
  Printer: Printer$1,
  Radio: Radio$1,
  RefreshCcw: RefreshCcw$1,
  RefreshCw: RefreshCw$1,
  Repeat: Repeat$1,
  Rewind: Rewind$1,
  RotateCcw: RotateCcw$1,
  RotateCw: RotateCw$1,
  Rss: Rss$1,
  Save: Save$1,
  Scissors: Scissors$1,
  Search: Search$1,
  Send: Send$1,
  Server: Server$1,
  Settings: Settings,
  Share2: Share2$1,
  Share: Share$1,
  ShieldOff: ShieldOff$1,
  Shield: Shield$1,
  ShoppingBag: ShoppingBag$1,
  ShoppingCart: ShoppingCart$1,
  Shuffle: Shuffle$1,
  Sidebar: Sidebar$1,
  SkipBack: SkipBack$1,
  SkipForward: SkipForward$1,
  Slack: Slack$1,
  Slash: Slash$1,
  Sliders: Sliders$1,
  Smartphone: Smartphone$1,
  Smile: Smile$1,
  Speaker: Speaker$1,
  Square: Square,
  Star: Star$1,
  StopCircle: StopCircle$1,
  Sun: Sun,
  Sunrise: Sunrise$1,
  Sunset: Sunset$1,
  Tablet: Tablet$1,
  Tag: Tag$1,
  Target: Target$1,
  Terminal: Terminal$1,
  Thermometer: Thermometer$1,
  ThumbsDown: ThumbsDown$1,
  ThumbsUp: ThumbsUp$1,
  ToggleLeft: ToggleLeft$1,
  ToggleRight: ToggleRight$1,
  Tool: Tool$1,
  Trash2: Trash2$1,
  Trash: Trash$1,
  Trello: Trello$1,
  TrendingDown: TrendingDown$1,
  TrendingUp: TrendingUp$1,
  Triangle: Triangle$1,
  Truck: Truck$1,
  Tv: Tv$1,
  Twitch: Twitch$1,
  Twitter: Twitter$1,
  Type: Type$1,
  Umbrella: Umbrella$1,
  Underline: Underline$1,
  Unlock: Unlock$1,
  UploadCloud: UploadCloud$1,
  Upload: Upload$1,
  UserCheck: UserCheck$1,
  UserMinus: UserMinus$1,
  UserPlus: UserPlus$1,
  UserX: UserX$1,
  User: User$1,
  Users: Users$1,
  VideoOff: VideoOff$1,
  Video: Video$1,
  Voicemail: Voicemail$1,
  Volume1: Volume1$1,
  Volume2: Volume2$1,
  VolumeX: VolumeX$1,
  Volume: Volume$1,
  Watch: Watch$1,
  WifiOff: WifiOff$1,
  Wifi: Wifi$1,
  Wind: Wind$1,
  XCircle: XCircle$1,
  XOctagon: XOctagon$1,
  XSquare: XSquare$1,
  X: X$1,
  Youtube: Youtube$1,
  ZapOff: ZapOff$1,
  Zap: Zap$1,
  ZoomIn: ZoomIn$1,
  ZoomOut: ZoomOut$1,
  A11yPerson: A11yPerson,
  ScreenSensor: ScreenSensor,
  isServerSide: isServerSide,
  isClientSide: isClientSide
});

var components = {
	...barchart,
	...choropleth,
	...histogram,
	...legend,
	...ui,
};

/* src/routes/components/[slug].svelte generated by Svelte v3.44.2 */
const file = "src/routes/components/[slug].svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i][0];
	child_ctx[23] = list[i][1];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i][0];
	child_ctx[27] = list[i][1];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i].key;
	child_ctx[31] = i;
	return child_ctx;
}

// (73:2) {#if data.length > 1}
function create_if_block_2(ctx) {
	let div1;
	let h2;
	let t0;
	let t1;
	let div0;
	let select;
	let select_size_value;
	let mounted;
	let dispose;
	let each_value_2 = /*data*/ ctx[0];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	const block = {
		c: function create() {
			div1 = element("div");
			h2 = element("h2");
			t0 = text("Choose an example");
			t1 = space();
			div0 = element("div");
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h2 = claim_element(div1_nodes, "H2", {});
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Choose an example");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			select = claim_element(div0_nodes, "SELECT", { size: true, class: true });
			var select_nodes = children(select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(select_nodes);
			}

			select_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h2, file, 74, 4, 1696);
			attr_dev(select, "size", select_size_value = /*data*/ ctx[0].length);
			attr_dev(select, "class", "svelte-1gqqmmb");
			add_location(select, file, 77, 5, 1801);
			attr_dev(div0, "class", "distancer svelte-1gqqmmb");
			add_location(div0, file, 75, 4, 1727);
			attr_dev(div1, "class", "distancer svelte-1gqqmmb");
			add_location(div1, file, 73, 3, 1668);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			append_hydration_dev(div1, h2);
			append_hydration_dev(h2, t0);
			append_hydration_dev(div1, t1);
			append_hydration_dev(div1, div0);
			append_hydration_dev(div0, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			if (!mounted) {
				dispose = listen_dev(select, "change", /*change_handler*/ ctx[16], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*selected, data*/ 65) {
				each_value_2 = /*data*/ ctx[0];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}

			if (dirty[0] & /*data*/ 1 && select_size_value !== (select_size_value = /*data*/ ctx[0].length)) {
				attr_dev(select, "size", select_size_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(73:2) {#if data.length > 1}",
		ctx
	});

	return block;
}

// (82:6) {#each data as {key}
function create_each_block_2(ctx) {
	let option;
	let t_value = /*key*/ ctx[26] + "";
	let t;
	let option_selected_value;

	const block = {
		c: function create() {
			option = element("option");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			option = claim_element(nodes, "OPTION", { class: true });
			var option_nodes = children(option);
			t = claim_text(option_nodes, t_value);
			option_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			option.__value = /*index*/ ctx[31];
			option.value = option.__value;
			option.selected = option_selected_value = /*index*/ ctx[31] === /*selected*/ ctx[6];
			attr_dev(option, "class", "svelte-1gqqmmb");
			add_location(option, file, 82, 7, 1950);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, option, anchor);
			append_hydration_dev(option, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*data*/ 1 && t_value !== (t_value = /*key*/ ctx[26] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*selected*/ 64 && option_selected_value !== (option_selected_value = /*index*/ ctx[31] === /*selected*/ ctx[6])) {
				prop_dev(option, "selected", option_selected_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(82:6) {#each data as {key}",
		ctx
	});

	return block;
}

// (94:2) {#if payloads}
function create_if_block_1(ctx) {
	let h2;
	let t0;
	let t1;
	let div;
	let each_value_1 = pairs(/*payloads*/ ctx[9]);
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text("Events");
			t1 = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", {});
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Events");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h2, file, 94, 3, 2138);
			attr_dev(div, "class", "distancer svelte-1gqqmmb");
			add_location(div, file, 95, 3, 2157);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, h2, anchor);
			append_hydration_dev(h2, t0);
			insert_hydration_dev(target, t1, anchor);
			insert_hydration_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*payloads*/ 512) {
				each_value_1 = pairs(/*payloads*/ ctx[9]);
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(94:2) {#if payloads}",
		ctx
	});

	return block;
}

// (97:4) {#each _.pairs(payloads) as [key, value]}
function create_each_block_1(ctx) {
	let div;
	let span;
	let t0_value = /*key*/ ctx[26] + "";
	let t0;
	let t1;
	let pre;
	let t2_value = (/*value*/ ctx[27] || '[payload]') + "";
	let t2;
	let t3;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			pre = element("pre");
			t2 = text(t2_value);
			t3 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, t0_value);
			span_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			pre = claim_element(div_nodes, "PRE", { class: true });
			var pre_nodes = children(pre);
			t2 = claim_text(pre_nodes, t2_value);
			pre_nodes.forEach(detach_dev);
			t3 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-1gqqmmb");
			add_location(span, file, 98, 6, 2256);
			attr_dev(pre, "class", "svelte-1gqqmmb");
			add_location(pre, file, 99, 6, 2281);
			attr_dev(div, "class", "row svelte-1gqqmmb");
			add_location(div, file, 97, 5, 2232);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, span);
			append_hydration_dev(span, t0);
			append_hydration_dev(div, t1);
			append_hydration_dev(div, pre);
			append_hydration_dev(pre, t2);
			append_hydration_dev(div, t3);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*payloads*/ 512 && t0_value !== (t0_value = /*key*/ ctx[26] + "")) set_data_dev(t0, t0_value);
			if (dirty[0] & /*payloads*/ 512 && t2_value !== (t2_value = (/*value*/ ctx[27] || '[payload]') + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(97:4) {#each _.pairs(payloads) as [key, value]}",
		ctx
	});

	return block;
}

// (115:3) {#each displayProps as [propName, propValue]}
function create_each_block(ctx) {
	let h3;
	let code;
	let t0_value = /*propName*/ ctx[22] + "";
	let t0;
	let t1;
	let div;
	let jsontree;
	let t2;
	let current;

	jsontree = new Root({
			props: { value: /*propValue*/ ctx[23] },
			$$inline: true
		});

	const block = {
		c: function create() {
			h3 = element("h3");
			code = element("code");
			t0 = text(t0_value);
			t1 = space();
			div = element("div");
			create_component(jsontree.$$.fragment);
			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			h3 = claim_element(nodes, "H3", {});
			var h3_nodes = children(h3);
			code = claim_element(h3_nodes, "CODE", {});
			var code_nodes = children(code);
			t0 = claim_text(code_nodes, t0_value);
			code_nodes.forEach(detach_dev);
			h3_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(jsontree.$$.fragment, div_nodes);
			t2 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(code, file, 115, 8, 2581);
			add_location(h3, file, 115, 4, 2577);
			attr_dev(div, "class", "distancer svelte-1gqqmmb");
			add_location(div, file, 116, 4, 2614);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, h3, anchor);
			append_hydration_dev(h3, code);
			append_hydration_dev(code, t0);
			insert_hydration_dev(target, t1, anchor);
			insert_hydration_dev(target, div, anchor);
			mount_component(jsontree, div, null);
			append_hydration_dev(div, t2);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty[0] & /*displayProps*/ 1024) && t0_value !== (t0_value = /*propName*/ ctx[22] + "")) set_data_dev(t0, t0_value);
			const jsontree_changes = {};
			if (dirty[0] & /*displayProps*/ 1024) jsontree_changes.value = /*propValue*/ ctx[23];
			jsontree.$set(jsontree_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(jsontree.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(jsontree.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h3);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div);
			destroy_component(jsontree);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(115:3) {#each displayProps as [propName, propValue]}",
		ctx
	});

	return block;
}

// (138:2) {:else}
function create_else_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*currentData*/ ctx[5].props];
	var switch_value = /*component*/ ctx[11];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_1] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		/*switch_instance_binding_1*/ ctx[19](switch_instance);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_hydration_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*currentData*/ 32)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*currentData*/ ctx[5].props)])
			: {};

			if (dirty[0] & /*currentData*/ 32 | dirty[1] & /*$$scope*/ 2) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*component*/ ctx[11])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					/*switch_instance_binding_1*/ ctx[19](switch_instance);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*switch_instance_binding_1*/ ctx[19](null);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(138:2) {:else}",
		ctx
	});

	return block;
}

// (125:2) {#if isSVG}
function create_if_block(ctx) {
	let div;
	let svg;
	let switch_instance;
	let div_resize_listener;
	let current;

	const switch_instance_spread_levels = [
		{
			.../*currentData*/ ctx[5].props,
			width: /*width*/ ctx[7],
			height: /*height*/ ctx[8]
		}
	];

	var switch_value = /*component*/ ctx[11];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		/*switch_instance_binding*/ ctx[17](switch_instance);
	}

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			svg = claim_svg_element(div_nodes, "svg", { width: true, height: true });
			var svg_nodes = children(svg);
			if (switch_instance) claim_component(switch_instance.$$.fragment, svg_nodes);
			svg_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[7]);
			attr_dev(svg, "height", /*height*/ ctx[8]);
			add_location(svg, file, 129, 4, 2852);
			attr_dev(div, "class", "svgwrapper svelte-1gqqmmb");
			add_render_callback(() => /*div_elementresize_handler*/ ctx[18].call(div));
			add_location(div, file, 125, 3, 2755);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, svg);

			if (switch_instance) {
				mount_component(switch_instance, svg, null);
			}

			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[18].bind(div));
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*currentData, width, height*/ 416)
			? get_spread_update(switch_instance_spread_levels, [
					{
						.../*currentData*/ ctx[5].props,
						width: /*width*/ ctx[7],
						height: /*height*/ ctx[8]
					}
				])
			: {};

			if (dirty[0] & /*currentData*/ 32 | dirty[1] & /*$$scope*/ 2) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*component*/ ctx[11])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					/*switch_instance_binding*/ ctx[17](switch_instance);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, svg, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty[0] & /*width*/ 128) {
				attr_dev(svg, "width", /*width*/ ctx[7]);
			}

			if (!current || dirty[0] & /*height*/ 256) {
				attr_dev(svg, "height", /*height*/ ctx[8]);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			/*switch_instance_binding*/ ctx[17](null);
			if (switch_instance) destroy_component(switch_instance);
			div_resize_listener();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(125:2) {#if isSVG}",
		ctx
	});

	return block;
}

// (139:3) <svelte:component     bind:this={instance}     this={component}     {...currentData.props}    >
function create_default_slot_1(ctx) {
	let t_value = /*currentData*/ ctx[5].content + "";
	let t;

	const block = {
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
			if (dirty[0] & /*currentData*/ 32 && t_value !== (t_value = /*currentData*/ ctx[5].content + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(139:3) <svelte:component     bind:this={instance}     this={component}     {...currentData.props}    >",
		ctx
	});

	return block;
}

// (131:5) <svelte:component       bind:this={instance}       this={component}       {...{...currentData.props, width, height}}      >
function create_default_slot(ctx) {
	let t_value = /*currentData*/ ctx[5].content + "";
	let t;

	const block = {
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
			if (dirty[0] & /*currentData*/ 32 && t_value !== (t_value = /*currentData*/ ctx[5].content + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(131:5) <svelte:component       bind:this={instance}       this={component}       {...{...currentData.props, width, height}}      >",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let title_value;
	let t0;
	let main;
	let h1;
	let t1;
	let t2;
	let div3;
	let div0;
	let elements;
	let t3;
	let t4;
	let t5;
	let div1;
	let h20;
	let t6;
	let t7;
	let pre;
	let t8_value = /*currentData*/ ctx[5].usage + "";
	let t8;
	let t9;
	let div2;
	let h21;
	let t10;
	let t11;
	let t12;
	let div4;
	let current_block_type_index;
	let if_block2;
	let current;
	document.title = title_value = "" + (/*name*/ ctx[2] + ": " + /*title*/ ctx[3] + " - Svizzle");

	elements = new Elements({
			props: { elements: /*doc*/ ctx[1] },
			$$inline: true
		});

	let if_block0 = /*data*/ ctx[0].length > 1 && create_if_block_2(ctx);
	let if_block1 = /*payloads*/ ctx[9] && create_if_block_1(ctx);
	let each_value = /*displayProps*/ ctx[10];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isSVG*/ ctx[12]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			t0 = space();
			main = element("main");
			h1 = element("h1");
			t1 = text(/*title*/ ctx[3]);
			t2 = space();
			div3 = element("div");
			div0 = element("div");
			create_component(elements.$$.fragment);
			t3 = space();
			if (if_block0) if_block0.c();
			t4 = space();
			if (if_block1) if_block1.c();
			t5 = space();
			div1 = element("div");
			h20 = element("h2");
			t6 = text("Usage");
			t7 = space();
			pre = element("pre");
			t8 = text(t8_value);
			t9 = space();
			div2 = element("div");
			h21 = element("h2");
			t10 = text("Props");
			t11 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t12 = space();
			div4 = element("div");
			if_block2.c();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all('[data-svelte=\"svelte-1sqseen\"]', document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			main = claim_element(nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			h1 = claim_element(main_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*title*/ ctx[3]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(main_nodes);
			div3 = claim_element(main_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div0 = claim_element(div3_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(elements.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t3 = claim_space(div3_nodes);
			if (if_block0) if_block0.l(div3_nodes);
			t4 = claim_space(div3_nodes);
			if (if_block1) if_block1.l(div3_nodes);
			t5 = claim_space(div3_nodes);
			div1 = claim_element(div3_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h20 = claim_element(div1_nodes, "H2", {});
			var h20_nodes = children(h20);
			t6 = claim_text(h20_nodes, "Usage");
			h20_nodes.forEach(detach_dev);
			t7 = claim_space(div1_nodes);
			pre = claim_element(div1_nodes, "PRE", { class: true });
			var pre_nodes = children(pre);
			t8 = claim_text(pre_nodes, t8_value);
			pre_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t9 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			h21 = claim_element(div2_nodes, "H2", {});
			var h21_nodes = children(h21);
			t10 = claim_text(h21_nodes, "Props");
			h21_nodes.forEach(detach_dev);
			t11 = claim_space(div2_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div2_nodes);
			}

			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t12 = claim_space(main_nodes);
			div4 = claim_element(main_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			if_block2.l(div4_nodes);
			div4_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-1gqqmmb");
			add_location(h1, file, 63, 1, 1499);
			attr_dev(div0, "class", "distancer svelte-1gqqmmb");
			add_location(div0, file, 67, 2, 1558);
			add_location(h20, file, 107, 3, 2404);
			attr_dev(pre, "class", "svelte-1gqqmmb");
			add_location(pre, file, 108, 3, 2422);
			attr_dev(div1, "class", "distancer svelte-1gqqmmb");
			add_location(div1, file, 106, 2, 2377);
			add_location(h21, file, 113, 3, 2509);
			attr_dev(div2, "class", "distancer svelte-1gqqmmb");
			add_location(div2, file, 112, 2, 2482);
			attr_dev(div3, "class", "col col1 svelte-1gqqmmb");
			add_location(div3, file, 64, 1, 1517);
			attr_dev(div4, "class", "col col2 svelte-1gqqmmb");
			add_location(div4, file, 123, 1, 2715);
			attr_dev(main, "class", "svelte-1gqqmmb");
			add_location(main, file, 62, 0, 1491);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, main, anchor);
			append_hydration_dev(main, h1);
			append_hydration_dev(h1, t1);
			append_hydration_dev(main, t2);
			append_hydration_dev(main, div3);
			append_hydration_dev(div3, div0);
			mount_component(elements, div0, null);
			append_hydration_dev(div3, t3);
			if (if_block0) if_block0.m(div3, null);
			append_hydration_dev(div3, t4);
			if (if_block1) if_block1.m(div3, null);
			append_hydration_dev(div3, t5);
			append_hydration_dev(div3, div1);
			append_hydration_dev(div1, h20);
			append_hydration_dev(h20, t6);
			append_hydration_dev(div1, t7);
			append_hydration_dev(div1, pre);
			append_hydration_dev(pre, t8);
			append_hydration_dev(div3, t9);
			append_hydration_dev(div3, div2);
			append_hydration_dev(div2, h21);
			append_hydration_dev(h21, t10);
			append_hydration_dev(div2, t11);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div2, null);
			}

			append_hydration_dev(main, t12);
			append_hydration_dev(main, div4);
			if_blocks[current_block_type_index].m(div4, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty[0] & /*name, title*/ 12) && title_value !== (title_value = "" + (/*name*/ ctx[2] + ": " + /*title*/ ctx[3] + " - Svizzle"))) {
				document.title = title_value;
			}

			if (!current || dirty[0] & /*title*/ 8) set_data_dev(t1, /*title*/ ctx[3]);
			const elements_changes = {};
			if (dirty[0] & /*doc*/ 2) elements_changes.elements = /*doc*/ ctx[1];
			elements.$set(elements_changes);

			if (/*data*/ ctx[0].length > 1) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(div3, t4);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*payloads*/ ctx[9]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					if_block1.m(div3, t5);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if ((!current || dirty[0] & /*currentData*/ 32) && t8_value !== (t8_value = /*currentData*/ ctx[5].usage + "")) set_data_dev(t8, t8_value);

			if (dirty[0] & /*displayProps*/ 1024) {
				each_value = /*displayProps*/ ctx[10];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div2, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
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
				if_block2.m(div4, null);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(elements.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(elements.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(main);
			destroy_component(elements);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_each(each_blocks, detaching);
			if_blocks[current_block_type_index].d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function preload({ params, query }) {
	return lookup[params.slug];
}

function instance_1($$self, $$props, $$invalidate) {
	let isSVG;
	let payloads;
	let component;
	let selected;
	let currentData;
	let displayProps;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('U5Bslugu5D', slots, []);
	const makeKeyedEmptyString = makeKeyed('');
	let { data } = $$props;
	let { doc } = $$props;
	let { events } = $$props;
	let { name } = $$props;
	let { namespace } = $$props;
	let { title } = $$props;
	let instance;
	let width;
	let height;

	const makeEventHandler = eventName => event => {
		$$invalidate(9, payloads = setIn(payloads, eventName, JSON.stringify(event.detail)));
	};

	let eventRemovers = [];
	const writable_props = ['data', 'doc', 'events', 'name', 'namespace', 'title'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U5Bslugu5D> was created with unknown prop '${key}'`);
	});

	const change_handler = event => {
		$$invalidate(6, selected = Number(event.target.value));
	};

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			instance = $$value;
			$$invalidate(4, instance);
		});
	}

	function div_elementresize_handler() {
		width = this.clientWidth;
		height = this.clientHeight;
		$$invalidate(7, width);
		$$invalidate(8, height);
	}

	function switch_instance_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			instance = $$value;
			$$invalidate(4, instance);
		});
	}

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('doc' in $$props) $$invalidate(1, doc = $$props.doc);
		if ('events' in $$props) $$invalidate(14, events = $$props.events);
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
		if ('namespace' in $$props) $$invalidate(13, namespace = $$props.namespace);
		if ('title' in $$props) $$invalidate(3, title = $$props.title);
	};

	$$self.$capture_state = () => ({
		lookup,
		preload,
		_,
		makeKeyed,
		JSONTree: Root,
		Elements,
		components,
		makeKeyedEmptyString,
		data,
		doc,
		events,
		name,
		namespace,
		title,
		instance,
		width,
		height,
		makeEventHandler,
		eventRemovers,
		payloads,
		currentData,
		displayProps,
		selected,
		component,
		isSVG
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('doc' in $$props) $$invalidate(1, doc = $$props.doc);
		if ('events' in $$props) $$invalidate(14, events = $$props.events);
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
		if ('namespace' in $$props) $$invalidate(13, namespace = $$props.namespace);
		if ('title' in $$props) $$invalidate(3, title = $$props.title);
		if ('instance' in $$props) $$invalidate(4, instance = $$props.instance);
		if ('width' in $$props) $$invalidate(7, width = $$props.width);
		if ('height' in $$props) $$invalidate(8, height = $$props.height);
		if ('eventRemovers' in $$props) $$invalidate(15, eventRemovers = $$props.eventRemovers);
		if ('payloads' in $$props) $$invalidate(9, payloads = $$props.payloads);
		if ('currentData' in $$props) $$invalidate(5, currentData = $$props.currentData);
		if ('displayProps' in $$props) $$invalidate(10, displayProps = $$props.displayProps);
		if ('selected' in $$props) $$invalidate(6, selected = $$props.selected);
		if ('component' in $$props) $$invalidate(11, component = $$props.component);
		if ('isSVG' in $$props) $$invalidate(12, isSVG = $$props.isSVG);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*namespace*/ 8192) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(13, namespace = namespace || 'html');
		}

		if ($$self.$$.dirty[0] & /*namespace*/ 8192) {
			$$invalidate(12, isSVG = namespace === 'svg');
		}

		if ($$self.$$.dirty[0] & /*events*/ 16384) {
			$$invalidate(9, payloads = events ? makeKeyedEmptyString(events) : null);
		}

		if ($$self.$$.dirty[0] & /*name*/ 4) {
			$$invalidate(11, component = components[name]);
		}

		if ($$self.$$.dirty[0] & /*data*/ 1) {
			$$invalidate(6, selected = data && 0);
		}

		if ($$self.$$.dirty[0] & /*data, selected*/ 65) {
			$$invalidate(5, currentData = data[selected]);
		}

		if ($$self.$$.dirty[0] & /*currentData*/ 32) {
			$$invalidate(10, displayProps = pairs(currentData.props));
		}

		if ($$self.$$.dirty[0] & /*data, instance, eventRemovers, events*/ 49169) {
			if (data && instance) {
				eventRemovers.forEach(remove => remove());
				$$invalidate(15, eventRemovers = []);

				events && events.forEach(eventName => {
					const eventHandler = makeEventHandler(eventName);
					const eventRemover = instance.$on(eventName, eventHandler);
					eventRemovers.push(eventRemover);
				});
			}
		}
	};

	return [
		data,
		doc,
		name,
		title,
		instance,
		currentData,
		selected,
		width,
		height,
		payloads,
		displayProps,
		component,
		isSVG,
		namespace,
		events,
		eventRemovers,
		change_handler,
		switch_instance_binding,
		div_elementresize_handler,
		switch_instance_binding_1
	];
}

class U5Bslugu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance_1,
			create_fragment,
			safe_not_equal,
			{
				data: 0,
				doc: 1,
				events: 14,
				name: 2,
				namespace: 13,
				title: 3
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bslugu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*data*/ ctx[0] === undefined && !('data' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'data'");
		}

		if (/*doc*/ ctx[1] === undefined && !('doc' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'doc'");
		}

		if (/*events*/ ctx[14] === undefined && !('events' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'events'");
		}

		if (/*name*/ ctx[2] === undefined && !('name' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'name'");
		}

		if (/*namespace*/ ctx[13] === undefined && !('namespace' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'namespace'");
		}

		if (/*title*/ ctx[3] === undefined && !('title' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'title'");
		}
	}

	get data() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get doc() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set doc(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get events() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set events(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get name() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get namespace() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set namespace(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { U5Bslugu5D as default, preload };
