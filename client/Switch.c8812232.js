import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, Q as createEventDispatcher, R as validate_store, T as component_subscribe, U as writable, z as svg_element, f as claim_element, g as children, b as detach_dev, j as attr_dev, y as toggle_class, k as add_location, l as insert_dev, D as empty, n as noop, o as validate_each_argument, B as listen_dev, m as append_dev, r as destroy_each, t as text, h as claim_text, A as set_data_dev, V as is_function, W as run_all, e as element, G as create_component, H as claim_component, I as mount_component, w as transition_in, x as transition_out, J as destroy_component, a as space, c as claim_space, O as add_render_callback, P as add_resize_listener, K as group_outros, L as check_outros, C as bubble, p as create_slot, u as update_slot, X as prop_dev } from './client.ed49fe48.js';
import { $ as reduceWith, a0 as allOf, a1 as isGTE, a2 as isLTE, M as identity, A as sort, a3 as adapter, a4 as map, p as pipe, Q as reduce, a5 as isNotNil, a6 as isIterableNotEmpty, a7 as every, a8 as hasKey, g as getKey, m as mapWith, a9 as flatten, Z as getPath, F as collect, aa as findIndexWhere, ab as findLastIndexWhere, ac as slice, B as uniques, I as sortWith, ad as filterWith, c as concat, x as appendTo, y as last, z as pullFrom } from './defaultLocale.f3c5fc93.js';
import { p as pairs, m as makeStyleVars, I as Icon } from './Info.aabe6ce3.js';
import { i as inclusiveRange, b as getValues, c as getFirstAndLast } from './ScreenGauge.8c0d1ef1.js';
import { m as mergeObj, l as linear } from './linear.86b0ac46.js';

/**
* @module @svizzle/utils/[any-number]:accumcb-[array-number]
*/

/**
 * Return a function expecting an array of objects and returning the max of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMax|arrayMax},
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example

> maxWithAbsSin = arrayMaxWith(_.pipe([Math.sin, Math.abs]))
> maxWithAbsSin([-Math.PI/2, -Math.PI/4])
1
> maxWithAbsSin([Math.PI/4, Math.PI/6])
0.7071067811865475

 *
 * @since 0.1.0
 */
const arrayMaxWith = fn => reduceWith((max, item) => {
	const value = fn(item);

	return value > max ? value : max;
}, -Infinity);

/**
 * Return a function expecting an array of objects and returning the min of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMin|arrayMin},
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example
> minWithAbsSin = arrayMinWith(_.pipe([Math.sin, Math.abs]))
> minWithAbsSin([-Math.PI/2, -Math.PI/4])
0.7071067811865475
> minWithAbsSin([Math.PI/4, Math.PI/6])
0.49999999999999994
 *
 * @since 0.1.0
 */
const arrayMinWith = fn => reduceWith((min, item) => {
	const value = fn(item);

	return value < min ? value : min;
}, Infinity);

/**
* @module @svizzle/utils/array-[number-boolean]
*/

/**
 * Return a function expecting a number and returning true if the number is within the provided range.
 * Note that the range is inclusive.
 *
 * @function
 * @arg {array} range - Array of two numbers
 * @return {function} predicate - Number -> Boolean
 *
 * @example
> isWithinRange = makeIsWithinRange([0, 5])
> isWithinRange(2)
true
> isWithinRange(5)
true
> isWithinRange(8)
false
 *
 * @since 0.1.0
 */
const makeIsWithinRange = range => allOf([
	isGTE(range[0]),
	isLTE(range[1])
]);

function extent(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}

/**
* @module @svizzle/geometry/2DVector
*/

/**
 * Calculates the length of a vector
 *
 * @function
 * @arg {object} point - A point representing a vector starting in the origin
 * @return {number} - The vector length
 *
 * @example
> vectorLength2D(1, 1)
1.4142135623730951
> vectorLength2D(0, 0)
0
 *
 * @since 0.1.0
 */
const vectorLength2D = (dx, dy) => Math.sqrt(dx * dx + dy * dy);

/**
* @module @svizzle/histogram/utils
*/

/* binning */

/**
 * A binning function that returns an exact amount of bins.
 *
 * @function
 * @arg {array} items - items to be binned
 * @arg {number} amount - desired amount of bins
 * @arg {function} [accessor=_.identity] - item accessor
 * @arg {(number[]|null)} [maxExtent=null] - the desired output extent
 * @return {array} bins - {range, values}[]
 *
 * @example
> const items = [1, 2, 6, 7, 8, 14, 20];
> exactAmountBins({array: items, amount: 3});
[
	{range: [1, 8], values: [1, 2, 6, 7, 8]},
	{range: [8, 15], values: [14]},
	{range: [15, 22], values: [20]}
]
> exactAmountBins({
	array,
	amount: 3,
	maxExtent: [2, 15]
})
[
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
]
> const items = [{a: 1}, {a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}, {a: 20}];
> exactAmountBins({
	array,
	amount: 3,
	accessor: _.getKey('a'),
	maxExtent: [2, 14]
});
[
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
]
 *
 * @since 0.1.0
 */
const exactAmountBins = ({
	array,
	amount,
	accessor = identity,
	maxExtent = null
}) => {
	const activeRange = maxExtent
		? sort(maxExtent)
		: extent(array, accessor);
	const [min, max] = activeRange;

	if (min === max) {
		return [{ values: array }]
	}

	const integerMin = Math.floor(min);
	const step = Math.ceil((max - integerMin) / amount);
	const integerMax = integerMin + step * amount;
	const ranges = pairs(inclusiveRange([integerMin, integerMax, step]));

	// TODO svizzle/utils
	const findRangeIndex = adapter(
		map(ranges, (range, index) => {
			const predicate = pipe([
				accessor,
				allOf([
					makeIsWithinRange(activeRange),
					makeIsWithinRange(range),
				])
			]);

			return value => predicate(value) ? index : undefined
		})
	);

	return reduce(array,
		(acc, item) => {
			const index = findRangeIndex(item);
			isNotNil(index) && acc[index].values.push(item);
			return acc;
		},
		map(ranges, range => ({ range, values: [] }))
	);
};

/* bins getters and functions */

/**
 * Returns true if bins are valid, meaning:
 * - there is at least one bin object
 * - they all have a `range` key
 * - `range` is not `null` or `undefined`
 *
 * @function
 * @arg {array} bins
 * @return {array} bins - {range, values}[]
 *
 * @example
> areValidBins([])
false

> areValidBins([
	{values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
false

> areValidBins([
	{range: null, values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
false

> areValidBins([
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
true
 *
 * @since 0.1.0
 */
const areValidBins = allOf([
	isIterableNotEmpty,
	every(allOf([
		hasKey('range'),
		pipe([getKey('range'), isNotNil])
	]))
]);

/**
 * Return all the values in the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {any[]} values
 *
 * @example
> getBinsItems([
	{range: [2, 6], values: [{a: 2}, {a: 6}]},
	{range: [6, 10], values: [{a: 7}, {a: 8}]},
	{range: [10, 14], values: [{a: 12}, {a: 14}]}
])
[{a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}]
 *
 * @since 0.1.0
 */
const getBinsItems = pipe([
	mapWith(getValues),
	flatten,
]);

const getValuesLength = getPath('values.length');

/**
 * Return the length of the longest bin
 *
 * @function
 * @arg {array} bins
 * @return {number} max - length of the longest bin
 *
 * @example
> getBinsMin([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
3
 *
 * @since 0.1.0
 */
const getBinsMax = arrayMaxWith(getValuesLength);

/**
 * Return the length of the shortest bin
 *
 * @function
 * @arg {array} bins
 * @return {number} min - length of the shortest bin
 *
 * @example
> getBinsMin([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
1
 *
 * @since 0.1.0
 */
const getBinsMin = arrayMinWith(getValuesLength);

/**
 * Return the extent of the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {array} extent
 *
 * @example
> getBinsExtent([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]}
])
[1, 3]
 *
 * @since 0.1.0
 */
const getBinsExtent = collect([getBinsMin, getBinsMax]);

/**
 * Return `true` if the `values` property of the provided bin is not empty
 *
 * @function
 * @arg {object} bin - {range, values}
 * @return {boolean}
 *
 * @example
> isNonEmptyBin({range: [-8, -3], values: []})
false
> isNonEmptyBin({range: [2, 7], values: [2, 6, 7]})
true
 *
 * @since 0.1.0
 */
const isNonEmptyBin = pipe([getValues, isIterableNotEmpty]);

/**
 * Return the index of the first bin with non-empty `values`
 *
 * @function
 * @arg {array} bins - {range, values}[]
 * @return {number}
 *
 * @example
> findFirstNonEmptyBinIndex([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
2
 *
 * @since 0.1.0
 */
const findFirstNonEmptyBinIndex = findIndexWhere(isNonEmptyBin);

/**
 * Return the index of the last bin with non-empty `values`
 *
 * @function
 * @arg {array} bins - {range, values}[]
 * @return {number}
 *
 * @example
> findLastNonEmptyBinIndex([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
4
 *
 * @since 0.1.0
 */
const findLastNonEmptyBinIndex = findLastIndexWhere(isNonEmptyBin);

/**
 * Return an object containing:
 * - a copy of the provided bins without the trailing bins with no values
 * - `start` and `end` of the trim
 *
 * @function
 * @arg {array} bins
 * @return {object} object - {bins, end, start}
 *
 * @example
> getTrimmedBinsStats([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
{
	bins: [
		{range: [2, 7], values: [2, 6, 7]},
		{range: [7, 12], values: [8]},
		{range: [12, 17], values: [14]},
	],
	end: 4,
	start: 2
}
> getTrimmedBinsStats([
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: [8]},
	{range: [12, 17], values: [14]},
	{range: [17, 22], values: []},
])
{
	bins: [
		{range: [2, 7], values: [2, 6, 7]},
		{range: [7, 12], values: [8]},
		{range: [12, 17], values: [14]},
	],
	end: 2,
	start: 0
}
 *
 * @since 0.1.0
 */
const getTrimmedBinsStats = bins => {
	const start = findFirstNonEmptyBinIndex(bins);
	const end = findLastNonEmptyBinIndex(bins);

	return {
		bins: slice(bins, start, end + 1),
		end,
		start
	};
};

/* ticks */

/**
 * Return the ticks for the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks
 *
 * @example
> getBinsTicks([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[-8, -3, 2, 7, 12, 17, 22, 27, 32]
 *
 * @since 0.1.0
 */
const getBinsTicks = pipe([
	mapWith(getKey('range')),
	flatten,
	uniques,
	sortWith([])
]);

/**
 * Return the extent of all ticks for the provided bins
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks extent
 *
 * @example
> getBinsTicksExtent([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[-8, 32]
 *
 * @since 0.4.0
 */
const getBinsTicksExtent = pipe([getBinsTicks, getFirstAndLast]);

/**
 * Return the ticks for the provided bins using the non-empty ones
 *
 * @function
 * @arg {array} bins
 * @return {number[]} ticks
 *
 * @example
> getNonEmptyBinsTicks([
	{range: [-8, -3], values: []},
	{range: [-3, 2], values: []},
	{range: [2, 7], values: [2, 6, 7]},
	{range: [7, 12], values: []},
	{range: [12, 17], values: []},
	{range: [17, 22], values: [18, 19, 20]},
	{range: [22, 27], values: [24, 25]},
	{range: [27, 32], values: []},
])
[2, 7, 17, 22, 27]
 *
 * @since 0.1.0
 */
const getNonEmptyBinsTicks = pipe([
	filterWith(getValuesLength),
	getBinsTicks
]);

/* ../../components/legend/src/ColorBinsG.svelte generated by Svelte v3.38.2 */
const file$b = "../../components/legend/src/ColorBinsG.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[49] = list[i].label;
	child_ctx[50] = list[i].x;
	child_ctx[51] = list[i].y;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[54] = list[i].barWidth;
	child_ctx[55] = list[i].barHeight;
	child_ctx[56] = list[i].fill;
	child_ctx[57] = list[i].selected;
	child_ctx[50] = list[i].x;
	child_ctx[51] = list[i].y;
	child_ctx[59] = i;
	return child_ctx;
}

// (307:0) {#if height && width}
function create_if_block$4(ctx) {
	let g;

	function select_block_type(ctx, dirty) {
		if (/*bins*/ ctx[0].length === 0) return create_if_block_1$3;
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
			g = claim_element(nodes, "g", { style: true, class: true }, 1);
			var g_nodes = children(g);
			if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "style", /*style*/ ctx[15]);
			attr_dev(g, "class", "ColorBinsG svelte-19g5ym1");
			toggle_class(g, "interactive", /*flags*/ ctx[1].isInteractive);
			add_location(g, file$b, 307, 1, 7401);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
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

			if (dirty[0] & /*style*/ 32768) {
				attr_dev(g, "style", /*style*/ ctx[15]);
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
		id: create_if_block$4.name,
		type: "if",
		source: "(307:0) {#if height && width}",
		ctx
	});

	return block;
}

// (321:2) {:else}
function create_else_block$1(ctx) {
	let if_block0_anchor;
	let g1;
	let g0;
	let rect;
	let rect_height_value;
	let rect_width_value;
	let if_block2_anchor;
	let g1_transform_value;
	let mounted;
	let dispose;
	let if_block0 = /*flags*/ ctx[1].withBackground && create_if_block_7(ctx);
	let if_block1 = /*flags*/ ctx[1].isInteractive && create_if_block_6(ctx);
	let each_value_1 = /*bars*/ ctx[8];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let if_block2 = /*flags*/ ctx[1].showTicks && create_if_block_4(ctx);
	let if_block3 = /*isBrushing*/ ctx[9] && create_if_block_2$1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			g1 = svg_element("g");
			g0 = svg_element("g");
			rect = svg_element("rect");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			if (if_block3) if_block3.c();
			this.h();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			if_block0_anchor = empty();
			if (if_block1) if_block1.l(nodes);
			g1 = claim_element(nodes, "g", { transform: true }, 1);
			var g1_nodes = children(g1);
			g0 = claim_element(g1_nodes, "g", { class: true }, 1);
			var g0_nodes = children(g0);
			rect = claim_element(g0_nodes, "rect", { class: true, height: true, width: true }, 1);
			children(rect).forEach(detach_dev);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g0_nodes);
			}

			g0_nodes.forEach(detach_dev);
			if (if_block2) if_block2.l(g1_nodes);
			if_block2_anchor = empty();
			if (if_block3) if_block3.l(g1_nodes);
			g1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "barsSensorBkg svelte-19g5ym1");
			attr_dev(rect, "height", rect_height_value = /*binsSize*/ ctx[12].height);
			attr_dev(rect, "width", rect_width_value = /*binsSize*/ ctx[12].width);
			add_location(rect, file$b, 345, 5, 8070);
			attr_dev(g0, "class", "bars");
			add_location(g0, file$b, 341, 4, 8006);
			attr_dev(g1, "transform", g1_transform_value = "translate(" + /*origin*/ ctx[11].x + "," + /*origin*/ ctx[11].y + ")");
			add_location(g1, file$b, 338, 3, 7934);
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, if_block0_anchor, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, g1, anchor);
			append_dev(g1, g0);
			append_dev(g0, rect);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g0, null);
			}

			if (if_block2) if_block2.m(g1, null);
			append_dev(g1, if_block2_anchor);
			if (if_block3) if_block3.m(g1, null);

			if (!mounted) {
				dispose = listen_dev(g0, "mouseleave", /*resetBrush*/ ctx[22], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*flags*/ ctx[1].withBackground) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_7(ctx);
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
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					if_block1.m(g1.parentNode, g1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*binsSize*/ 4096 && rect_height_value !== (rect_height_value = /*binsSize*/ ctx[12].height)) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*binsSize*/ 4096 && rect_width_value !== (rect_width_value = /*binsSize*/ ctx[12].width)) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*bars, onMousedown, onMouseenter, onMouseleave, isMousedown, onMousemove, onMouseup, flags*/ 4064514) {
				each_value_1 = /*bars*/ ctx[8];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (/*flags*/ ctx[1].showTicks) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_4(ctx);
					if_block2.c();
					if_block2.m(g1, if_block2_anchor);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*isBrushing*/ ctx[9]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_2$1(ctx);
					if_block3.c();
					if_block3.m(g1, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty[0] & /*origin*/ 2048 && g1_transform_value !== (g1_transform_value = "translate(" + /*origin*/ ctx[11].x + "," + /*origin*/ ctx[11].y + ")")) {
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
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(321:2) {:else}",
		ctx
	});

	return block;
}

// (313:2) {#if bins.length === 0}
function create_if_block_1$3(ctx) {
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
			text_1 = claim_element(nodes, "text", { class: true, x: true, y: true }, 1);
			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, /*message*/ ctx[3]);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "class", "message svelte-19g5ym1");
			attr_dev(text_1, "x", text_1_x_value = /*width*/ ctx[7] / 2);
			attr_dev(text_1, "y", text_1_y_value = /*height*/ ctx[6] / 2);
			add_location(text_1, file$b, 314, 3, 7510);
		},
		m: function mount(target, anchor) {
			insert_dev(target, text_1, anchor);
			append_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*message*/ 8) set_data_dev(t, /*message*/ ctx[3]);

			if (dirty[0] & /*width*/ 128 && text_1_x_value !== (text_1_x_value = /*width*/ ctx[7] / 2)) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*height*/ 64 && text_1_y_value !== (text_1_y_value = /*height*/ ctx[6] / 2)) {
				attr_dev(text_1, "y", text_1_y_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(313:2) {#if bins.length === 0}",
		ctx
	});

	return block;
}

// (324:3) {#if flags.withBackground}
function create_if_block_7(ctx) {
	let rect;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { class: true, width: true, height: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "bkg svelte-19g5ym1");
			attr_dev(rect, "width", /*width*/ ctx[7]);
			attr_dev(rect, "height", /*height*/ ctx[6]);
			add_location(rect, file$b, 324, 4, 7659);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*width*/ 128) {
				attr_dev(rect, "width", /*width*/ ctx[7]);
			}

			if (dirty[0] & /*height*/ 64) {
				attr_dev(rect, "height", /*height*/ ctx[6]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(324:3) {#if flags.withBackground}",
		ctx
	});

	return block;
}

// (329:3) {#if flags.isInteractive}
function create_if_block_6(ctx) {
	let rect;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { height: true, width: true, class: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "height", /*height*/ ctx[6]);
			attr_dev(rect, "width", /*width*/ ctx[7]);
			attr_dev(rect, "class", "bkgSensor svelte-19g5ym1");
			toggle_class(rect, "reset", /*selectedBins*/ ctx[4].length > 0);
			add_location(rect, file$b, 329, 4, 7784);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			if (!mounted) {
				dispose = listen_dev(rect, "click", /*resetSelection*/ ctx[23], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*height*/ 64) {
				attr_dev(rect, "height", /*height*/ ctx[6]);
			}

			if (dirty[0] & /*width*/ 128) {
				attr_dev(rect, "width", /*width*/ ctx[7]);
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
		id: create_if_block_6.name,
		type: "if",
		source: "(329:3) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (370:7) {#if flags.isInteractive}
function create_if_block_5(ctx) {
	let rect;
	let rect_height_value;
	let rect_width_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(nodes, "rect", { class: true, height: true, width: true }, 1);
			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "class", "rectsensor svelte-19g5ym1");
			attr_dev(rect, "height", rect_height_value = /*barHeight*/ ctx[55]);
			attr_dev(rect, "width", rect_width_value = /*barWidth*/ ctx[54]);
			add_location(rect, file$b, 370, 8, 8516);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);

			if (!mounted) {
				dispose = [
					listen_dev(rect, "mousedown", /*onMousedown*/ ctx[18], false, false, false),
					listen_dev(rect, "mouseover", /*onMouseenter*/ ctx[17](/*index*/ ctx[59]), false, false, false),
					listen_dev(rect, "mouseout", /*onMouseleave*/ ctx[21](/*index*/ ctx[59]), false, false, false),
					listen_dev(
						rect,
						"mousemove",
						function () {
							if (is_function(/*isMousedown*/ ctx[10]
							? /*onMousemove*/ ctx[19](/*index*/ ctx[59])
							: null)) (/*isMousedown*/ ctx[10]
							? /*onMousemove*/ ctx[19](/*index*/ ctx[59])
							: null).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(rect, "mouseup", /*onMouseup*/ ctx[20](/*index*/ ctx[59]), false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*bars*/ 256 && rect_height_value !== (rect_height_value = /*barHeight*/ ctx[55])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*bars*/ 256 && rect_width_value !== (rect_width_value = /*barWidth*/ ctx[54])) {
				attr_dev(rect, "width", rect_width_value);
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
		source: "(370:7) {#if flags.isInteractive}",
		ctx
	});

	return block;
}

// (352:5) {#each bars as {       barWidth,       barHeight,       fill,       selected,       x,       y      }
function create_each_block_1(ctx) {
	let g;
	let rect;
	let rect_fill_value;
	let rect_height_value;
	let rect_width_value;
	let g_transform_value;
	let if_block = /*flags*/ ctx[1].isInteractive && create_if_block_5(ctx);

	const block = {
		c: function create() {
			g = svg_element("g");
			rect = svg_element("rect");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, transform: true }, 1);
			var g_nodes = children(g);

			rect = claim_element(
				g_nodes,
				"rect",
				{
					fill: true,
					height: true,
					width: true,
					class: true
				},
				1
			);

			children(rect).forEach(detach_dev);
			if (if_block) if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "fill", rect_fill_value = /*fill*/ ctx[56]);
			attr_dev(rect, "height", rect_height_value = /*barHeight*/ ctx[55]);
			attr_dev(rect, "width", rect_width_value = /*barWidth*/ ctx[54]);
			attr_dev(rect, "class", "svelte-19g5ym1");
			toggle_class(rect, "selected", /*selected*/ ctx[57]);
			add_location(rect, file$b, 363, 7, 8369);
			attr_dev(g, "class", "bar svelte-19g5ym1");
			attr_dev(g, "transform", g_transform_value = "translate(" + /*x*/ ctx[50] + "," + /*y*/ ctx[51] + ")");
			add_location(g, file$b, 359, 6, 8294);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, rect);
			if (if_block) if_block.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*bars*/ 256 && rect_fill_value !== (rect_fill_value = /*fill*/ ctx[56])) {
				attr_dev(rect, "fill", rect_fill_value);
			}

			if (dirty[0] & /*bars*/ 256 && rect_height_value !== (rect_height_value = /*barHeight*/ ctx[55])) {
				attr_dev(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*bars*/ 256 && rect_width_value !== (rect_width_value = /*barWidth*/ ctx[54])) {
				attr_dev(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*bars*/ 256) {
				toggle_class(rect, "selected", /*selected*/ ctx[57]);
			}

			if (/*flags*/ ctx[1].isInteractive) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_5(ctx);
					if_block.c();
					if_block.m(g, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*bars*/ 256 && g_transform_value !== (g_transform_value = "translate(" + /*x*/ ctx[50] + "," + /*y*/ ctx[51] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(352:5) {#each bars as {       barWidth,       barHeight,       fill,       selected,       x,       y      }",
		ctx
	});

	return block;
}

// (387:4) {#if flags.showTicks}
function create_if_block_4(ctx) {
	let g;
	let g_font_size_value;
	let each_value = /*ticks*/ ctx[13];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true, "font-size": true }, 1);
			var g_nodes = children(g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g_nodes);
			}

			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "class", "ticks svelte-19g5ym1");
			attr_dev(g, "font-size", g_font_size_value = /*theme*/ ctx[5].fontSize);
			toggle_class(g, "vertical", /*flags*/ ctx[1].isVertical);
			add_location(g, file$b, 387, 5, 8938);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticks*/ 8192) {
				each_value = /*ticks*/ ctx[13];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(g, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty[0] & /*theme*/ 32 && g_font_size_value !== (g_font_size_value = /*theme*/ ctx[5].fontSize)) {
				attr_dev(g, "font-size", g_font_size_value);
			}

			if (dirty[0] & /*flags*/ 2) {
				toggle_class(g, "vertical", /*flags*/ ctx[1].isVertical);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(387:4) {#if flags.showTicks}",
		ctx
	});

	return block;
}

// (393:6) {#each ticks as {label, x, y}}
function create_each_block(ctx) {
	let text_1;
	let t_value = /*label*/ ctx[49] + "";
	let t;
	let text_1_x_value;
	let text_1_y_value;

	const block = {
		c: function create() {
			text_1 = svg_element("text");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			text_1 = claim_element(nodes, "text", { x: true, y: true, class: true }, 1);
			var text_1_nodes = children(text_1);
			t = claim_text(text_1_nodes, t_value);
			text_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(text_1, "x", text_1_x_value = /*x*/ ctx[50]);
			attr_dev(text_1, "y", text_1_y_value = /*y*/ ctx[51]);
			attr_dev(text_1, "class", "svelte-19g5ym1");
			add_location(text_1, file$b, 393, 7, 9085);
		},
		m: function mount(target, anchor) {
			insert_dev(target, text_1, anchor);
			append_dev(text_1, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*ticks*/ 8192 && t_value !== (t_value = /*label*/ ctx[49] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*ticks*/ 8192 && text_1_x_value !== (text_1_x_value = /*x*/ ctx[50])) {
				attr_dev(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*ticks*/ 8192 && text_1_y_value !== (text_1_y_value = /*y*/ ctx[51])) {
				attr_dev(text_1, "y", text_1_y_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(text_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(393:6) {#each ticks as {label, x, y}}",
		ctx
	});

	return block;
}

// (400:4) {#if isBrushing}
function create_if_block_2$1(ctx) {
	let g;

	function select_block_type_1(ctx, dirty) {
		if (/*flags*/ ctx[1].isVertical) return create_if_block_3$1;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			g = svg_element("g");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true }, 1);
			var g_nodes = children(g);
			if_block.l(g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "class", "brush svelte-19g5ym1");
			add_location(g, file$b, 400, 5, 9194);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			if_block.m(g, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(g, null);
				}
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(400:4) {#if isBrushing}",
		ctx
	});

	return block;
}

// (409:6) {:else}
function create_else_block_1(ctx) {
	let line;
	let line_x__value;
	let line_x__value_1;
	let line_y__value;
	let line_y__value_1;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(
				nodes,
				"line",
				{
					x1: true,
					x2: true,
					y1: true,
					y2: true,
					class: true
				},
				1
			);

			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "x1", line_x__value = /*brushLine*/ ctx[14].p1);
			attr_dev(line, "x2", line_x__value_1 = /*brushLine*/ ctx[14].p2);
			attr_dev(line, "y1", line_y__value = /*geometry*/ ctx[2].barThickness);
			attr_dev(line, "y2", line_y__value_1 = /*geometry*/ ctx[2].barThickness);
			attr_dev(line, "class", "svelte-19g5ym1");
			add_location(line, file$b, 409, 7, 9349);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*brushLine*/ 16384 && line_x__value !== (line_x__value = /*brushLine*/ ctx[14].p1)) {
				attr_dev(line, "x1", line_x__value);
			}

			if (dirty[0] & /*brushLine*/ 16384 && line_x__value_1 !== (line_x__value_1 = /*brushLine*/ ctx[14].p2)) {
				attr_dev(line, "x2", line_x__value_1);
			}

			if (dirty[0] & /*geometry*/ 4 && line_y__value !== (line_y__value = /*geometry*/ ctx[2].barThickness)) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*geometry*/ 4 && line_y__value_1 !== (line_y__value_1 = /*geometry*/ ctx[2].barThickness)) {
				attr_dev(line, "y2", line_y__value_1);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(409:6) {:else}",
		ctx
	});

	return block;
}

// (404:6) {#if flags.isVertical}
function create_if_block_3$1(ctx) {
	let line;
	let line_y__value;
	let line_y__value_1;

	const block = {
		c: function create() {
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			line = claim_element(nodes, "line", { y1: true, y2: true, class: true }, 1);
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(line, "y1", line_y__value = /*brushLine*/ ctx[14].p1);
			attr_dev(line, "y2", line_y__value_1 = /*brushLine*/ ctx[14].p2);
			attr_dev(line, "class", "svelte-19g5ym1");
			add_location(line, file$b, 404, 7, 9260);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*brushLine*/ 16384 && line_y__value !== (line_y__value = /*brushLine*/ ctx[14].p1)) {
				attr_dev(line, "y1", line_y__value);
			}

			if (dirty[0] & /*brushLine*/ 16384 && line_y__value_1 !== (line_y__value_1 = /*brushLine*/ ctx[14].p2)) {
				attr_dev(line, "y2", line_y__value_1);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(404:6) {#if flags.isVertical}",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
	let if_block_anchor;
	let if_block = /*height*/ ctx[6] && /*width*/ ctx[7] && create_if_block$4(ctx);

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
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*height*/ ctx[6] && /*width*/ ctx[7]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$4(ctx);
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
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	let innerWidth;
	let innerHeight;
	let widgetThickness;
	let origin;
	let binsSize;
	let valuesExtent;
	let range;
	let scale;
	let lastIndex;
	let semigap;
	let bars;
	let ticksDistance;
	let ticksValues;
	let ticks;
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
	validate_slots("ColorBinsG", slots, []);
	const dispatch = createEventDispatcher();

	const defaultFlags = {
		isInteractive: false,
		isVertical: false,
		showTicksExtentOnly: false,
		showTicks: true,
		withBackground: false
	};

	const defaultGeometry = {
		barThickness: 25,
		bottom: 10,
		brushThreshold: 10, // pixels to trigger brushing
		gap: 2,
		left: 10,
		right: 10,
		textPadding: 5,
		top: 10
	};

	const defaultTheme = {
		backgroundColor: "white",
		backgroundOpacity: 1,
		binFill: "white",
		binStroke: null, // null for no stroke, or a color string
		binStrokeWidth: 1, // ineffective for binStroke: null
		brushAddStroke: "rgb(107,248,134)",
		brushRemoveStroke: "rgb(246,97,20)",
		brushStrokeOpacity: 0.8,
		brushStrokeWidth: 8,
		fontSize: 12,
		messageColor: "black",
		messageFontSize: "1rem",
		selectedBinStroke: "black",
		selectedBinStrokeWidth: 2,
		textColor: "black"
	};

	let { height = null } = $$props;
	let { width = null } = $$props;
	let { bins = [] } = $$props; // {range: [number, number], color: string}[]
	let { flags = null } = $$props;
	let { geometry = null } = $$props;
	let { message = "No data" } = $$props;
	let { selectedBins = [] } = $$props;
	let { theme = null } = $$props;
	let { ticksFormatFn = null } = $$props;

	/* brushing */
	let isMousedown = false;

	const brushOff = {
		delta: 0,
		end: null,
		origin: { x: null, y: null },
		start: null,
		modifier: null,
		state: "Off"
	};

	const _brush = writable(brushOff);
	validate_store(_brush, "_brush");
	component_subscribe($$self, _brush, value => $$invalidate(35, $_brush = value));

	/* events */
	const getModifier = event => event.shiftKey ? "shift" : event.altKey ? "alt" : null;

	const onMouseenter = index => () => {
		if (isBrushing) {
			_brush.update(mergeObj({ end: index }));
		}

		dispatch("entered", index);
	};

	const onMousedown = event => {
		$$invalidate(10, isMousedown = true);

		_brush.set({
			delta: 0,
			modifier: getModifier(event),
			origin: { x: event.offsetX, y: event.offsetY },
			state: "Pressed"
		});
	};

	const onMousemove = index => event => {
		if (isPressed) {
			const delta = vectorLength2D(event.offsetX - $_brush.origin.x, event.offsetY - $_brush.origin.y);

			if (delta > geometry.brushThreshold) {
				_brush.update(mergeObj({
					end: index,
					start: index,
					state: "Brushing"
				}));

				dispatch("brushstart", index);
			} else {
				_brush.update(mergeObj({ delta }));
			}
		}
	};

	const onMouseup = index => () => {
		$$invalidate(10, isMousedown = false);

		if (isPressed) {
			if ($_brush.delta < geometry.brushThreshold) {
				if (doesBrushAdd) {
					$$invalidate(4, selectedBins = uniques(appendTo(selectedBins, index)));
				} else if (doesBrushRemove) {
					$$invalidate(4, selectedBins = pullFrom(selectedBins, [index]));
				} else {
					$$invalidate(4, selectedBins = [index]);
				}

				dispatch("clicked", { index, selectedBins });
			}
		} else if (isBrushing) {
			dispatch("brushend", index);
		}

		_brush.set(brushOff);
	};

	const onMouseleave = index => () => {
		dispatch("exited", index);
	};

	const resetBrush = () => {
		_brush.set(brushOff);
	};

	const resetSelection = () => {
		$$invalidate(4, selectedBins = []);
		dispatch("clicked", { selectedBins });
	};

	const writable_props = [
		"height",
		"width",
		"bins",
		"flags",
		"geometry",
		"message",
		"selectedBins",
		"theme",
		"ticksFormatFn"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ColorBinsG> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("height" in $$props) $$invalidate(6, height = $$props.height);
		if ("width" in $$props) $$invalidate(7, width = $$props.width);
		if ("bins" in $$props) $$invalidate(0, bins = $$props.bins);
		if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
		if ("geometry" in $$props) $$invalidate(2, geometry = $$props.geometry);
		if ("message" in $$props) $$invalidate(3, message = $$props.message);
		if ("selectedBins" in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
		if ("theme" in $$props) $$invalidate(5, theme = $$props.theme);
		if ("ticksFormatFn" in $$props) $$invalidate(24, ticksFormatFn = $$props.ticksFormatFn);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		writable,
		makeStyleVars,
		vectorLength2D,
		concat,
		inclusiveRange,
		mergeObj,
		scaleLinear: linear,
		appendTo,
		last,
		pullFrom,
		sort,
		uniques,
		getBinsTicks,
		getBinsTicksExtent,
		dispatch,
		defaultFlags,
		defaultGeometry,
		defaultTheme,
		height,
		width,
		bins,
		flags,
		geometry,
		message,
		selectedBins,
		theme,
		ticksFormatFn,
		isMousedown,
		brushOff,
		_brush,
		getModifier,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetBrush,
		resetSelection,
		innerWidth,
		innerHeight,
		widgetThickness,
		origin,
		binsSize,
		valuesExtent,
		range,
		scale,
		lastIndex,
		semigap,
		bars,
		ticksDistance,
		ticksValues,
		ticks,
		isBrushing,
		$_brush,
		isPressed,
		doesBrushAdd,
		doesBrushRemove,
		brushStroke,
		brushExtent,
		brushRange,
		brushExtentBarYs,
		brushLine,
		style
	});

	$$self.$inject_state = $$props => {
		if ("height" in $$props) $$invalidate(6, height = $$props.height);
		if ("width" in $$props) $$invalidate(7, width = $$props.width);
		if ("bins" in $$props) $$invalidate(0, bins = $$props.bins);
		if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
		if ("geometry" in $$props) $$invalidate(2, geometry = $$props.geometry);
		if ("message" in $$props) $$invalidate(3, message = $$props.message);
		if ("selectedBins" in $$props) $$invalidate(4, selectedBins = $$props.selectedBins);
		if ("theme" in $$props) $$invalidate(5, theme = $$props.theme);
		if ("ticksFormatFn" in $$props) $$invalidate(24, ticksFormatFn = $$props.ticksFormatFn);
		if ("isMousedown" in $$props) $$invalidate(10, isMousedown = $$props.isMousedown);
		if ("innerWidth" in $$props) $$invalidate(25, innerWidth = $$props.innerWidth);
		if ("innerHeight" in $$props) $$invalidate(26, innerHeight = $$props.innerHeight);
		if ("widgetThickness" in $$props) $$invalidate(27, widgetThickness = $$props.widgetThickness);
		if ("origin" in $$props) $$invalidate(11, origin = $$props.origin);
		if ("binsSize" in $$props) $$invalidate(12, binsSize = $$props.binsSize);
		if ("valuesExtent" in $$props) $$invalidate(28, valuesExtent = $$props.valuesExtent);
		if ("range" in $$props) $$invalidate(29, range = $$props.range);
		if ("scale" in $$props) $$invalidate(30, scale = $$props.scale);
		if ("lastIndex" in $$props) $$invalidate(31, lastIndex = $$props.lastIndex);
		if ("semigap" in $$props) $$invalidate(32, semigap = $$props.semigap);
		if ("bars" in $$props) $$invalidate(8, bars = $$props.bars);
		if ("ticksDistance" in $$props) $$invalidate(33, ticksDistance = $$props.ticksDistance);
		if ("ticksValues" in $$props) $$invalidate(34, ticksValues = $$props.ticksValues);
		if ("ticks" in $$props) $$invalidate(13, ticks = $$props.ticks);
		if ("isBrushing" in $$props) $$invalidate(9, isBrushing = $$props.isBrushing);
		if ("isPressed" in $$props) isPressed = $$props.isPressed;
		if ("doesBrushAdd" in $$props) $$invalidate(36, doesBrushAdd = $$props.doesBrushAdd);
		if ("doesBrushRemove" in $$props) $$invalidate(37, doesBrushRemove = $$props.doesBrushRemove);
		if ("brushStroke" in $$props) $$invalidate(38, brushStroke = $$props.brushStroke);
		if ("brushExtent" in $$props) $$invalidate(39, brushExtent = $$props.brushExtent);
		if ("brushRange" in $$props) $$invalidate(40, brushRange = $$props.brushRange);
		if ("brushExtentBarYs" in $$props) $$invalidate(41, brushExtentBarYs = $$props.brushExtentBarYs);
		if ("brushLine" in $$props) $$invalidate(14, brushLine = $$props.brushLine);
		if ("style" in $$props) $$invalidate(15, style = $$props.style);
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
			$$invalidate(3, message = message || "No data");
		}

		if ($$self.$$.dirty[0] & /*selectedBins*/ 16) {
			$$invalidate(4, selectedBins = selectedBins || []);
		}

		if ($$self.$$.dirty[0] & /*theme*/ 32) {
			$$invalidate(5, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty[0] & /*ticksFormatFn*/ 16777216) {
			$$invalidate(24, ticksFormatFn = ticksFormatFn || (x => x));
		}

		if ($$self.$$.dirty[0] & /*width, geometry*/ 132) {
			/* layout */
			$$invalidate(25, innerWidth = Math.max(0, width - geometry.left - geometry.right));
		}

		if ($$self.$$.dirty[0] & /*height, geometry*/ 68) {
			$$invalidate(26, innerHeight = Math.max(0, height - geometry.top - geometry.bottom));
		}

		if ($$self.$$.dirty[0] & /*geometry, flags, theme*/ 38) {
			$$invalidate(27, widgetThickness = geometry.barThickness + (flags.showTicks
			? flags.isVertical
				? 0
				: geometry.textPadding + theme.fontSize
			: 0));
		}

		if ($$self.$$.dirty[0] & /*geometry, flags, innerWidth, widgetThickness, innerHeight*/ 234881030) {
			$$invalidate(11, origin = {
				x: geometry.left + (flags.isVertical
				? (innerWidth - widgetThickness) / 2
				: 0),
				y: geometry.top + (flags.isVertical
				? 0
				: (innerHeight - widgetThickness) / 2)
			});
		}

		if ($$self.$$.dirty[0] & /*flags, geometry, innerWidth, innerHeight*/ 100663302) {
			$$invalidate(12, binsSize = {
				width: flags.isVertical ? geometry.barThickness : innerWidth,
				height: flags.isVertical ? innerHeight : geometry.barThickness
			});
		}

		if ($$self.$$.dirty[0] & /*bins*/ 1) {
			/* scale */
			$$invalidate(28, valuesExtent = bins.length && [bins[0].range[0], last(bins).range[1]]);
		}

		if ($$self.$$.dirty[0] & /*flags, innerHeight, innerWidth*/ 100663298) {
			$$invalidate(29, range = flags.isVertical ? [innerHeight, 0] : [0, innerWidth]);
		}

		if ($$self.$$.dirty[0] & /*valuesExtent, range*/ 805306368) {
			$$invalidate(30, scale = valuesExtent && linear().domain(valuesExtent).range(range));
		}

		if ($$self.$$.dirty[0] & /*bins*/ 1) {
			/* bars */
			$$invalidate(31, lastIndex = bins.length - 1);
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 4) {
			$$invalidate(32, semigap = geometry.gap / 2);
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 16) {
			$$invalidate(9, isBrushing = $_brush.state === "Brushing");
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 16) {
			$$invalidate(36, doesBrushAdd = $_brush.modifier === "shift");
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 512 | $$self.$$.dirty[1] & /*$_brush*/ 16) {
			$$invalidate(39, brushExtent = isBrushing && sort([$_brush.start, $_brush.end]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 512 | $$self.$$.dirty[1] & /*brushExtent*/ 256) {
			$$invalidate(40, brushRange = isBrushing && inclusiveRange(brushExtent));
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 16) {
			$$invalidate(37, doesBrushRemove = $_brush.modifier === "alt");
		}

		if ($$self.$$.dirty[0] & /*isBrushing, selectedBins*/ 528 | $$self.$$.dirty[1] & /*doesBrushAdd, brushRange, doesBrushRemove, $_brush*/ 624) {
			if (isBrushing) {
				$$invalidate(4, selectedBins = doesBrushAdd
				? uniques(concat(selectedBins, brushRange))
				: doesBrushRemove
					? pullFrom(selectedBins, brushRange)
					: brushRange);

				dispatch("brushed", {
					end: $_brush.end,
					selectedBins,
					start: $_brush.start
				});
			}
		}

		if ($$self.$$.dirty[0] & /*bins, selectedBins, scale, flags, geometry, theme*/ 1073741879 | $$self.$$.dirty[1] & /*semigap, lastIndex*/ 3) {
			$$invalidate(8, bars = bins.map((bin, index) => {
				const { range: [v1, v2], color } = bin;
				const selected = selectedBins.length && selectedBins.includes(index);
				const p1 = scale(v1);
				const p2 = scale(v2);
				let x;
				let y;
				let start;
				let end;
				let sensorX;
				let sensorY;

				if (flags.isVertical) {
					start = p1 - (index > 0 ? semigap : 0);
					end = p2 + (index < lastIndex ? semigap : 0);
					x = 0;
					y = end;
					sensorX = 0;
					sensorY = p2;
				} else {
					start = p1 + (index > 0 ? semigap : 0);
					end = p2 - (index < lastIndex ? semigap : 0);
					x = start;
					y = 0;
					sensorX = p1;
					sensorY = 0;
				}

				const barLength = Math.abs(end - start);
				const sensorLength = Math.abs(p2 - p1);

				return {
					...bin,
					...{
						barHeight: flags.isVertical ? barLength : geometry.barThickness,
						barWidth: flags.isVertical ? geometry.barThickness : barLength,
						fill: color || theme.binFill,
						p1,
						p2,
						selected,
						sensorHeight: flags.isVertical ? sensorLength : geometry.barThickness,
						sensorWidth: flags.isVertical ? geometry.barThickness : sensorLength,
						sensorX,
						sensorY,
						x,
						y
					}
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*geometry*/ 4) {
			/* ticks */
			$$invalidate(33, ticksDistance = geometry.barThickness + geometry.textPadding);
		}

		if ($$self.$$.dirty[0] & /*flags, bins*/ 3) {
			$$invalidate(34, ticksValues = flags.showTicksExtentOnly
			? getBinsTicksExtent(bins)
			: getBinsTicks(bins));
		}

		if ($$self.$$.dirty[0] & /*ticksFormatFn, flags, scale*/ 1090519042 | $$self.$$.dirty[1] & /*ticksValues, ticksDistance*/ 12) {
			$$invalidate(13, ticks = ticksValues.map(value => ({
				label: ticksFormatFn(value),
				x: flags.isVertical ? ticksDistance : scale(value),
				y: flags.isVertical ? scale(value) : ticksDistance
			})));
		}

		if ($$self.$$.dirty[1] & /*$_brush*/ 16) {
			isPressed = $_brush.state === "Pressed";
		}

		if ($$self.$$.dirty[0] & /*theme*/ 32 | $$self.$$.dirty[1] & /*doesBrushAdd, doesBrushRemove*/ 96) {
			$$invalidate(38, brushStroke = doesBrushAdd
			? theme.brushAddStroke
			: doesBrushRemove ? theme.brushRemoveStroke : null);
		}

		if ($$self.$$.dirty[0] & /*isBrushing, bars*/ 768 | $$self.$$.dirty[1] & /*brushExtent*/ 256) {
			$$invalidate(41, brushExtentBarYs = isBrushing && sort([
				bars[brushExtent[0]].p1,
				bars[brushExtent[0]].p2,
				bars[brushExtent[1]].p1,
				bars[brushExtent[1]].p2
			]));
		}

		if ($$self.$$.dirty[0] & /*isBrushing*/ 512 | $$self.$$.dirty[1] & /*brushExtentBarYs*/ 1024) {
			$$invalidate(14, brushLine = isBrushing && {
				p1: brushExtentBarYs[0],
				p2: brushExtentBarYs[3]
			});
		}

		if ($$self.$$.dirty[0] & /*theme*/ 32 | $$self.$$.dirty[1] & /*brushStroke*/ 128) {
			/* style */
			$$invalidate(15, style = makeStyleVars({ ...theme, brushStroke }));
		}
	};

	return [
		bins,
		flags,
		geometry,
		message,
		selectedBins,
		theme,
		height,
		width,
		bars,
		isBrushing,
		isMousedown,
		origin,
		binsSize,
		ticks,
		brushLine,
		style,
		_brush,
		onMouseenter,
		onMousedown,
		onMousemove,
		onMouseup,
		onMouseleave,
		resetBrush,
		resetSelection,
		ticksFormatFn,
		innerWidth,
		innerHeight,
		widgetThickness,
		valuesExtent,
		range,
		scale,
		lastIndex,
		semigap,
		ticksDistance,
		ticksValues,
		$_brush,
		doesBrushAdd,
		doesBrushRemove,
		brushStroke,
		brushExtent,
		brushRange,
		brushExtentBarYs
	];
}

class ColorBinsG extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$b,
			create_fragment$b,
			safe_not_equal,
			{
				height: 6,
				width: 7,
				bins: 0,
				flags: 1,
				geometry: 2,
				message: 3,
				selectedBins: 4,
				theme: 5,
				ticksFormatFn: 24
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ColorBinsG",
			options,
			id: create_fragment$b.name
		});
	}

	get height() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bins() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get message() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set message(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<ColorBinsG>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<ColorBinsG>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/legend/src/ColorBinsDiv.svelte generated by Svelte v3.38.2 */
const file$a = "../../components/legend/src/ColorBinsDiv.svelte";

// (33:1) {#if title}
function create_if_block_1$2(ctx) {
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
			attr_dev(h2, "class", "svelte-1amymvq");
			add_location(h2, file$a, 34, 3, 745);
			attr_dev(header, "class", "svelte-1amymvq");
			add_location(header, file$a, 33, 2, 733);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, h2);
			append_dev(h2, t);
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
		id: create_if_block_1$2.name,
		type: "if",
		source: "(33:1) {#if title}",
		ctx
	});

	return block;
}

// (47:4) {#if bins}
function create_if_block$3(ctx) {
	let colorbinsg;
	let current;

	colorbinsg = new ColorBinsG({
			props: {
				bins: /*bins*/ ctx[1],
				flags: /*flags*/ ctx[2],
				geometry: /*geometry*/ ctx[3],
				height: /*height*/ ctx[8],
				message: /*message*/ ctx[4],
				selectedBins: /*selectedBins*/ ctx[5],
				theme: /*theme*/ ctx[6],
				ticksFormatFn: /*ticksFormatFn*/ ctx[7],
				width: /*width*/ ctx[9]
			},
			$$inline: true
		});

	colorbinsg.$on("brushed", /*brushed_handler*/ ctx[13]);
	colorbinsg.$on("brushend", /*brushend_handler*/ ctx[14]);
	colorbinsg.$on("brushstart", /*brushstart_handler*/ ctx[15]);
	colorbinsg.$on("clicked", /*clicked_handler*/ ctx[16]);
	colorbinsg.$on("entered", /*entered_handler*/ ctx[17]);
	colorbinsg.$on("exited", /*exited_handler*/ ctx[18]);

	const block = {
		c: function create() {
			create_component(colorbinsg.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(colorbinsg.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(colorbinsg, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const colorbinsg_changes = {};
			if (dirty & /*bins*/ 2) colorbinsg_changes.bins = /*bins*/ ctx[1];
			if (dirty & /*flags*/ 4) colorbinsg_changes.flags = /*flags*/ ctx[2];
			if (dirty & /*geometry*/ 8) colorbinsg_changes.geometry = /*geometry*/ ctx[3];
			if (dirty & /*height*/ 256) colorbinsg_changes.height = /*height*/ ctx[8];
			if (dirty & /*message*/ 16) colorbinsg_changes.message = /*message*/ ctx[4];
			if (dirty & /*selectedBins*/ 32) colorbinsg_changes.selectedBins = /*selectedBins*/ ctx[5];
			if (dirty & /*theme*/ 64) colorbinsg_changes.theme = /*theme*/ ctx[6];
			if (dirty & /*ticksFormatFn*/ 128) colorbinsg_changes.ticksFormatFn = /*ticksFormatFn*/ ctx[7];
			if (dirty & /*width*/ 512) colorbinsg_changes.width = /*width*/ ctx[9];
			colorbinsg.$set(colorbinsg_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(colorbinsg.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(colorbinsg.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(colorbinsg, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(47:4) {#if bins}",
		ctx
	});

	return block;
}

function create_fragment$a(ctx) {
	let div;
	let t;
	let main;
	let svg;
	let main_resize_listener;
	let current;
	let if_block0 = /*title*/ ctx[0] && create_if_block_1$2(ctx);
	let if_block1 = /*bins*/ ctx[1] && create_if_block$3(ctx);

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
			svg = claim_element(main_nodes, "svg", { width: true, height: true, class: true }, 1);
			var svg_nodes = children(svg);
			if (if_block1) if_block1.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "width", /*width*/ ctx[9]);
			attr_dev(svg, "height", /*height*/ ctx[8]);
			attr_dev(svg, "class", "svelte-1amymvq");
			add_location(svg, file$a, 42, 3, 894);
			attr_dev(main, "class", "svelte-1amymvq");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[19].call(main));
			toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			add_location(main, file$a, 37, 2, 783);
			attr_dev(div, "class", "ColorBinsDiv svelte-1amymvq");
			attr_dev(div, "style", /*style*/ ctx[10]);
			toggle_class(div, "interactive", /*flags*/ ctx[2] && /*flags*/ ctx[2].isInteractive);
			add_location(div, file$a, 27, 0, 630);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t);
			append_dev(div, main);
			append_dev(main, svg);
			if (if_block1) if_block1.m(svg, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[19].bind(main));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1$2(ctx);
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
					if_block1 = create_if_block$3(ctx);
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

			if (!current || dirty & /*width*/ 512) {
				attr_dev(svg, "width", /*width*/ ctx[9]);
			}

			if (!current || dirty & /*height*/ 256) {
				attr_dev(svg, "height", /*height*/ ctx[8]);
			}

			if (dirty & /*title*/ 1) {
				toggle_class(main, "titled", /*title*/ ctx[0] && /*title*/ ctx[0].length);
			}

			if (!current || dirty & /*style*/ 1024) {
				attr_dev(div, "style", /*style*/ ctx[10]);
			}

			if (dirty & /*flags*/ 4) {
				toggle_class(div, "interactive", /*flags*/ ctx[2] && /*flags*/ ctx[2].isInteractive);
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
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ColorBinsDiv", slots, []);
	let { headerHeight = null } = $$props;
	let { padding = null } = $$props;
	let { title = null } = $$props;
	let { bins = [] } = $$props; // {range: [number, number], color: string}[]
	let { flags = null } = $$props;
	let { geometry = null } = $$props;
	let { message = "No data" } = $$props;
	let { selectedBins = [] } = $$props;
	let { theme = null } = $$props;
	let { ticksFormatFn = null } = $$props;
	let height = 0;
	let width = 0;

	const writable_props = [
		"headerHeight",
		"padding",
		"title",
		"bins",
		"flags",
		"geometry",
		"message",
		"selectedBins",
		"theme",
		"ticksFormatFn"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ColorBinsDiv> was created with unknown prop '${key}'`);
	});

	function brushed_handler(event) {
		bubble($$self, event);
	}

	function brushend_handler(event) {
		bubble($$self, event);
	}

	function brushstart_handler(event) {
		bubble($$self, event);
	}

	function clicked_handler(event) {
		bubble($$self, event);
	}

	function entered_handler(event) {
		bubble($$self, event);
	}

	function exited_handler(event) {
		bubble($$self, event);
	}

	function main_elementresize_handler() {
		height = this.clientHeight;
		width = this.clientWidth;
		$$invalidate(8, height);
		$$invalidate(9, width);
	}

	$$self.$$set = $$props => {
		if ("headerHeight" in $$props) $$invalidate(11, headerHeight = $$props.headerHeight);
		if ("padding" in $$props) $$invalidate(12, padding = $$props.padding);
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
		if ("flags" in $$props) $$invalidate(2, flags = $$props.flags);
		if ("geometry" in $$props) $$invalidate(3, geometry = $$props.geometry);
		if ("message" in $$props) $$invalidate(4, message = $$props.message);
		if ("selectedBins" in $$props) $$invalidate(5, selectedBins = $$props.selectedBins);
		if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
		if ("ticksFormatFn" in $$props) $$invalidate(7, ticksFormatFn = $$props.ticksFormatFn);
	};

	$$self.$capture_state = () => ({
		makeStyleVars,
		ColorBinsG,
		headerHeight,
		padding,
		title,
		bins,
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
		if ("headerHeight" in $$props) $$invalidate(11, headerHeight = $$props.headerHeight);
		if ("padding" in $$props) $$invalidate(12, padding = $$props.padding);
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("bins" in $$props) $$invalidate(1, bins = $$props.bins);
		if ("flags" in $$props) $$invalidate(2, flags = $$props.flags);
		if ("geometry" in $$props) $$invalidate(3, geometry = $$props.geometry);
		if ("message" in $$props) $$invalidate(4, message = $$props.message);
		if ("selectedBins" in $$props) $$invalidate(5, selectedBins = $$props.selectedBins);
		if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
		if ("ticksFormatFn" in $$props) $$invalidate(7, ticksFormatFn = $$props.ticksFormatFn);
		if ("height" in $$props) $$invalidate(8, height = $$props.height);
		if ("width" in $$props) $$invalidate(9, width = $$props.width);
		if ("style" in $$props) $$invalidate(10, style = $$props.style);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*padding*/ 4096) {
			$$invalidate(12, padding = padding || "10px");
		}

		if ($$self.$$.dirty & /*headerHeight*/ 2048) {
			$$invalidate(11, headerHeight = headerHeight || "2rem");
		}

		if ($$self.$$.dirty & /*headerHeight, padding*/ 6144) {
			$$invalidate(10, style = makeStyleVars({ headerHeight, padding }));
		}
	};

	return [
		title,
		bins,
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

class ColorBinsDiv extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
			headerHeight: 11,
			padding: 12,
			title: 0,
			bins: 1,
			flags: 2,
			geometry: 3,
			message: 4,
			selectedBins: 5,
			theme: 6,
			ticksFormatFn: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ColorBinsDiv",
			options,
			id: create_fragment$a.name
		});
	}

	get headerHeight() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set headerHeight(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get padding() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set padding(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bins() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bins(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flags() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get geometry() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set geometry(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get message() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set message(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedBins() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedBins(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticksFormatFn() {
		throw new Error("<ColorBinsDiv>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticksFormatFn(value) {
		throw new Error("<ColorBinsDiv>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/ui/src/icons/feather/CheckSquare.svelte generated by Svelte v3.38.2 */

const file$9 = "../../components/ui/src/icons/feather/CheckSquare.svelte";

function create_fragment$9(ctx) {
	let polyline;
	let path;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_element(nodes, "polyline", { points: true }, 1);
			children(polyline).forEach(detach_dev);
			path = claim_element(nodes, "path", { d: true }, 1);
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "9 11 12 14 22 4");
			add_location(polyline, file$9, 1, 0, 34);
			attr_dev(path, "d", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11");
			add_location(path, file$9, 1, 46, 80);
		},
		m: function mount(target, anchor) {
			insert_dev(target, polyline, anchor);
			insert_dev(target, path, anchor);
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
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("CheckSquare", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CheckSquare> was created with unknown prop '${key}'`);
	});

	return [];
}

class CheckSquare extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CheckSquare",
			options,
			id: create_fragment$9.name
		});
	}
}

/* ../../components/ui/src/icons/feather/ChevronDown.svelte generated by Svelte v3.38.2 */

const file$8 = "../../components/ui/src/icons/feather/ChevronDown.svelte";

function create_fragment$8(ctx) {
	let polyline;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_element(nodes, "polyline", { points: true }, 1);
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "6 9 12 15 18 9");
			add_location(polyline, file$8, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_dev(target, polyline, anchor);
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
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ChevronDown", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChevronDown> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronDown extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronDown",
			options,
			id: create_fragment$8.name
		});
	}
}

/* ../../components/ui/src/icons/feather/ChevronUp.svelte generated by Svelte v3.38.2 */

const file$7 = "../../components/ui/src/icons/feather/ChevronUp.svelte";

function create_fragment$7(ctx) {
	let polyline;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_element(nodes, "polyline", { points: true }, 1);
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "18 15 12 9 6 15");
			add_location(polyline, file$7, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_dev(target, polyline, anchor);
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
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ChevronUp", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChevronUp> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronUp extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronUp",
			options,
			id: create_fragment$7.name
		});
	}
}

/* ../../components/ui/src/icons/feather/ExternalLink.svelte generated by Svelte v3.38.2 */

const file$6 = "../../components/ui/src/icons/feather/ExternalLink.svelte";

function create_fragment$6(ctx) {
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
			path = claim_element(nodes, "path", { d: true }, 1);
			children(path).forEach(detach_dev);
			polyline = claim_element(nodes, "polyline", { points: true }, 1);
			children(polyline).forEach(detach_dev);
			line = claim_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true }, 1);
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6");
			add_location(path, file$6, 1, 0, 34);
			attr_dev(polyline, "points", "15 3 21 3 21 9");
			add_location(polyline, file$6, 1, 74, 108);
			attr_dev(line, "x1", "10");
			attr_dev(line, "y1", "14");
			attr_dev(line, "x2", "21");
			attr_dev(line, "y2", "3");
			add_location(line, file$6, 1, 119, 153);
		},
		m: function mount(target, anchor) {
			insert_dev(target, path, anchor);
			insert_dev(target, polyline, anchor);
			insert_dev(target, line, anchor);
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
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ExternalLink", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ExternalLink> was created with unknown prop '${key}'`);
	});

	return [];
}

class ExternalLink extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ExternalLink",
			options,
			id: create_fragment$6.name
		});
	}
}

/* ../../components/ui/src/icons/feather/Globe.svelte generated by Svelte v3.38.2 */

const file$5 = "../../components/ui/src/icons/feather/Globe.svelte";

function create_fragment$5(ctx) {
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
			circle = claim_element(nodes, "circle", { cx: true, cy: true, r: true }, 1);
			children(circle).forEach(detach_dev);
			line = claim_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true }, 1);
			children(line).forEach(detach_dev);
			path = claim_element(nodes, "path", { d: true }, 1);
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$5, 1, 0, 34);
			attr_dev(line, "x1", "2");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "22");
			attr_dev(line, "y2", "12");
			add_location(line, file$5, 1, 40, 74);
			attr_dev(path, "d", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z");
			add_location(path, file$5, 1, 84, 118);
		},
		m: function mount(target, anchor) {
			insert_dev(target, circle, anchor);
			insert_dev(target, line, anchor);
			insert_dev(target, path, anchor);
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
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Globe", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Globe> was created with unknown prop '${key}'`);
	});

	return [];
}

class Globe extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Globe",
			options,
			id: create_fragment$5.name
		});
	}
}

/* ../../components/ui/src/icons/feather/Square.svelte generated by Svelte v3.38.2 */

const file$4 = "../../components/ui/src/icons/feather/Square.svelte";

function create_fragment$4(ctx) {
	let rect;

	const block = {
		c: function create() {
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			rect = claim_element(
				nodes,
				"rect",
				{
					x: true,
					y: true,
					width: true,
					height: true,
					rx: true,
					ry: true
				},
				1
			);

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect, "x", "3");
			attr_dev(rect, "y", "3");
			attr_dev(rect, "width", "18");
			attr_dev(rect, "height", "18");
			attr_dev(rect, "rx", "2");
			attr_dev(rect, "ry", "2");
			add_location(rect, file$4, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_dev(target, rect, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(rect);
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

function instance$4($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Square", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Square> was created with unknown prop '${key}'`);
	});

	return [];
}

class Square extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Square",
			options,
			id: create_fragment$4.name
		});
	}
}

/* ../../components/ui/src/Link.svelte generated by Svelte v3.38.2 */
const file$3 = "../../components/ui/src/Link.svelte";

// (59:1) {#if isExternal}
function create_if_block$2(ctx) {
	let span;
	let icon;
	let current;

	icon = new Icon({
			props: {
				glyph: ExternalLink,
				size: /*iconSize*/ ctx[3],
				stroke: /*theme*/ ctx[9].iconStroke,
				strokeWidth: /*theme*/ ctx[9].iconStrokeWidth
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			span = element("span");
			create_component(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			claim_component(icon.$$.fragment, span_nodes);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-rt948z");
			add_location(span, file$3, 59, 2, 1447);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			mount_component(icon, span, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconSize*/ 8) icon_changes.size = /*iconSize*/ ctx[3];
			if (dirty & /*theme*/ 512) icon_changes.stroke = /*theme*/ ctx[9].iconStroke;
			if (dirty & /*theme*/ 512) icon_changes.strokeWidth = /*theme*/ ctx[9].iconStrokeWidth;
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
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(59:1) {#if isExternal}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let a;
	let span;
	let t;
	let current;
	const default_slot_template = /*#slots*/ ctx[14].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);
	let if_block = /*isExternal*/ ctx[5] && create_if_block$2(ctx);

	const block = {
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
			span = claim_element(a_nodes, "SPAN", { class: true });
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
			toggle_class(span, "bold", /*isBold*/ ctx[4]);
			add_location(span, file$3, 55, 1, 1375);
			attr_dev(a, "download", /*download*/ ctx[0]);
			attr_dev(a, "href", /*href*/ ctx[1]);
			attr_dev(a, "hreflang", /*hreflang*/ ctx[2]);
			attr_dev(a, "rel", /*rel*/ ctx[7]);
			attr_dev(a, "style", /*style*/ ctx[11]);
			attr_dev(a, "target", /*target*/ ctx[8]);
			attr_dev(a, "type", /*type*/ ctx[10]);
			attr_dev(a, "class", "svelte-rt948z");
			toggle_class(a, "underlined", /*isUnderlined*/ ctx[6]);
			add_location(a, file$3, 45, 0, 1270);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			append_dev(a, span);

			if (default_slot) {
				default_slot.m(span, null);
			}

			append_dev(a, t);
			if (if_block) if_block.m(a, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[13], dirty, null, null);
				}
			}

			if (dirty & /*isBold*/ 16) {
				toggle_class(span, "bold", /*isBold*/ ctx[4]);
			}

			if (/*isExternal*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isExternal*/ 32) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(a, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*download*/ 1) {
				attr_dev(a, "download", /*download*/ ctx[0]);
			}

			if (!current || dirty & /*href*/ 2) {
				attr_dev(a, "href", /*href*/ ctx[1]);
			}

			if (!current || dirty & /*hreflang*/ 4) {
				attr_dev(a, "hreflang", /*hreflang*/ ctx[2]);
			}

			if (!current || dirty & /*rel*/ 128) {
				attr_dev(a, "rel", /*rel*/ ctx[7]);
			}

			if (!current || dirty & /*style*/ 2048) {
				attr_dev(a, "style", /*style*/ ctx[11]);
			}

			if (!current || dirty & /*target*/ 256) {
				attr_dev(a, "target", /*target*/ ctx[8]);
			}

			if (!current || dirty & /*type*/ 1024) {
				attr_dev(a, "type", /*type*/ ctx[10]);
			}

			if (dirty & /*isUnderlined*/ 64) {
				toggle_class(a, "underlined", /*isUnderlined*/ ctx[6]);
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
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const defaultIconSize = 14;
const defaultRel = "noopener";

function instance$3($$self, $$props, $$invalidate) {
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Link", slots, ['default']);
	const { defaultStrokeWidth } = Icon;

	const defaultTheme = {
		iconStroke: "rgb(16, 174, 249)",
		iconStrokeWidth: defaultStrokeWidth,
		color: "black"
	};

	let { download = null } = $$props;
	let { href = null } = $$props;
	let { hreflang = null } = $$props;
	let { iconSize = defaultIconSize } = $$props;
	let { isBold = false } = $$props;
	let { isExternal = false } = $$props;
	let { isUnderlined = false } = $$props;
	let { rel = defaultRel } = $$props;
	let { target = null } = $$props;
	let { text = null } = $$props;
	let { theme = null } = $$props;
	let { type = null } = $$props;

	const writable_props = [
		"download",
		"href",
		"hreflang",
		"iconSize",
		"isBold",
		"isExternal",
		"isUnderlined",
		"rel",
		"target",
		"text",
		"theme",
		"type"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Link> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("download" in $$props) $$invalidate(0, download = $$props.download);
		if ("href" in $$props) $$invalidate(1, href = $$props.href);
		if ("hreflang" in $$props) $$invalidate(2, hreflang = $$props.hreflang);
		if ("iconSize" in $$props) $$invalidate(3, iconSize = $$props.iconSize);
		if ("isBold" in $$props) $$invalidate(4, isBold = $$props.isBold);
		if ("isExternal" in $$props) $$invalidate(5, isExternal = $$props.isExternal);
		if ("isUnderlined" in $$props) $$invalidate(6, isUnderlined = $$props.isUnderlined);
		if ("rel" in $$props) $$invalidate(7, rel = $$props.rel);
		if ("target" in $$props) $$invalidate(8, target = $$props.target);
		if ("text" in $$props) $$invalidate(12, text = $$props.text);
		if ("theme" in $$props) $$invalidate(9, theme = $$props.theme);
		if ("type" in $$props) $$invalidate(10, type = $$props.type);
		if ("$$scope" in $$props) $$invalidate(13, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		ExternalLink,
		Icon,
		defaultIconSize,
		defaultRel,
		defaultStrokeWidth,
		defaultTheme,
		download,
		href,
		hreflang,
		iconSize,
		isBold,
		isExternal,
		isUnderlined,
		rel,
		target,
		text,
		theme,
		type,
		style
	});

	$$self.$inject_state = $$props => {
		if ("download" in $$props) $$invalidate(0, download = $$props.download);
		if ("href" in $$props) $$invalidate(1, href = $$props.href);
		if ("hreflang" in $$props) $$invalidate(2, hreflang = $$props.hreflang);
		if ("iconSize" in $$props) $$invalidate(3, iconSize = $$props.iconSize);
		if ("isBold" in $$props) $$invalidate(4, isBold = $$props.isBold);
		if ("isExternal" in $$props) $$invalidate(5, isExternal = $$props.isExternal);
		if ("isUnderlined" in $$props) $$invalidate(6, isUnderlined = $$props.isUnderlined);
		if ("rel" in $$props) $$invalidate(7, rel = $$props.rel);
		if ("target" in $$props) $$invalidate(8, target = $$props.target);
		if ("text" in $$props) $$invalidate(12, text = $$props.text);
		if ("theme" in $$props) $$invalidate(9, theme = $$props.theme);
		if ("type" in $$props) $$invalidate(10, type = $$props.type);
		if ("style" in $$props) $$invalidate(11, style = $$props.style);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*download*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, download = download || null);
		}

		if ($$self.$$.dirty & /*href*/ 2) {
			$$invalidate(1, href = href || null);
		}

		if ($$self.$$.dirty & /*hreflang*/ 4) {
			$$invalidate(2, hreflang = hreflang || null);
		}

		if ($$self.$$.dirty & /*iconSize*/ 8) {
			$$invalidate(3, iconSize = iconSize || defaultIconSize);
		}

		if ($$self.$$.dirty & /*isBold*/ 16) {
			$$invalidate(4, isBold = isBold || false);
		}

		if ($$self.$$.dirty & /*isExternal*/ 32) {
			$$invalidate(5, isExternal = isExternal || false);
		}

		if ($$self.$$.dirty & /*isUnderlined*/ 64) {
			$$invalidate(6, isUnderlined = isUnderlined || false);
		}

		if ($$self.$$.dirty & /*rel*/ 128) {
			$$invalidate(7, rel = rel || defaultRel);
		}

		if ($$self.$$.dirty & /*target*/ 256) {
			$$invalidate(8, target = target || null);
		}

		if ($$self.$$.dirty & /*href, text*/ 4098) {
			$$invalidate(12, text = !href
			? "<Link.svelte>: PLEASE PROVIDE A `href` PROP"
			: text ?? href);
		}

		if ($$self.$$.dirty & /*theme*/ 512) {
			$$invalidate(9, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty & /*type*/ 1024) {
			$$invalidate(10, type = type || null);
		}

		if ($$self.$$.dirty & /*theme*/ 512) {
			$$invalidate(11, style = `--color: ${theme.color}`);
		}
	};

	return [
		download,
		href,
		hreflang,
		iconSize,
		isBold,
		isExternal,
		isUnderlined,
		rel,
		target,
		theme,
		type,
		style,
		text,
		$$scope,
		slots
	];
}

class Link extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
			download: 0,
			href: 1,
			hreflang: 2,
			iconSize: 3,
			isBold: 4,
			isExternal: 5,
			isUnderlined: 6,
			rel: 7,
			target: 8,
			text: 12,
			theme: 9,
			type: 10
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Link",
			options,
			id: create_fragment$3.name
		});
	}

	get download() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set download(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get href() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hreflang() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hreflang(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconSize() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconSize(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isBold() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isBold(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isExternal() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isExternal(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isUnderlined() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isUnderlined(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rel() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rel(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get target() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set target(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/ui/src/LinkButton.svelte generated by Svelte v3.38.2 */
const file$2 = "../../components/ui/src/LinkButton.svelte";

// (60:1) {:else}
function create_else_block(ctx) {
	let div;
	let if_block = /*text*/ ctx[1] && create_if_block_3(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (if_block) if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "svelte-s7xbpx");
			add_location(div, file$2, 60, 2, 1285);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
		},
		p: function update(ctx, dirty) {
			if (/*text*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_3(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(60:1) {:else}",
		ctx
	});

	return block;
}

// (41:1) {#if href}
function create_if_block$1(ctx) {
	let a;
	let div;
	let t;
	let current;
	let if_block0 = /*text*/ ctx[1] && create_if_block_2(ctx);
	let if_block1 = /*glyph*/ ctx[3] && create_if_block_1$1(ctx);

	const block = {
		c: function create() {
			a = element("a");
			div = element("div");
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true, class: true });
			var a_nodes = children(a);
			div = claim_element(a_nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			if (if_block1) if_block1.l(div_nodes);
			div_nodes.forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "clickable svelte-s7xbpx");
			add_location(div, file$2, 42, 3, 968);
			attr_dev(a, "href", /*href*/ ctx[4]);
			attr_dev(a, "class", "svelte-s7xbpx");
			add_location(a, file$2, 41, 2, 954);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			append_dev(a, div);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t);
			if (if_block1) if_block1.m(div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*text*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(div, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*glyph*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*glyph*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*href*/ 16) {
				attr_dev(a, "href", /*href*/ ctx[4]);
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
			if (detaching) detach_dev(a);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(41:1) {#if href}",
		ctx
	});

	return block;
}

// (62:3) {#if text}
function create_if_block_3(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(missingHrefText);
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, missingHrefText);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-s7xbpx");
			add_location(span, file$2, 62, 4, 1309);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(62:3) {#if text}",
		ctx
	});

	return block;
}

// (44:4) {#if text}
function create_if_block_2(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(/*text*/ ctx[1]);
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, /*text*/ ctx[1]);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-s7xbpx");
			add_location(span, file$2, 44, 5, 1012);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(44:4) {#if text}",
		ctx
	});

	return block;
}

// (47:4) {#if glyph}
function create_if_block_1$1(ctx) {
	let span;
	let icon;
	let current;

	icon = new Icon({
			props: {
				glyph: /*glyph*/ ctx[3],
				fill: /*theme*/ ctx[2].iconFill,
				size: /*iconSize*/ ctx[0],
				stroke: /*theme*/ ctx[2].iconStroke,
				strokeWidth: /*theme*/ ctx[2].iconStrokeWidth
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			span = element("span");
			create_component(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			claim_component(icon.$$.fragment, span_nodes);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-s7xbpx");
			add_location(span, file$2, 47, 5, 1063);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			mount_component(icon, span, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*glyph*/ 8) icon_changes.glyph = /*glyph*/ ctx[3];
			if (dirty & /*theme*/ 4) icon_changes.fill = /*theme*/ ctx[2].iconFill;
			if (dirty & /*iconSize*/ 1) icon_changes.size = /*iconSize*/ ctx[0];
			if (dirty & /*theme*/ 4) icon_changes.stroke = /*theme*/ ctx[2].iconStroke;
			if (dirty & /*theme*/ 4) icon_changes.strokeWidth = /*theme*/ ctx[2].iconStrokeWidth;
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
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(47:4) {#if glyph}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*href*/ ctx[4]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { style: true, class: true });
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "style", /*style*/ ctx[5]);
			attr_dev(div, "class", "linkButton svelte-s7xbpx");
			add_location(div, file$2, 36, 0, 904);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
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

			if (!current || dirty & /*style*/ 32) {
				attr_dev(div, "style", /*style*/ ctx[5]);
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
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const defaultText = "Please provide `text`";
const missingHrefText = "Please provide `href`";

function instance$2($$self, $$props, $$invalidate) {
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("LinkButton", slots, []);
	const { defaultFill, defaultSize, defaultStroke, defaultStrokeWidth } = Icon;

	const defaultTheme = {
		backgroundColor: "black",
		boxShadowColor: "lightgrey",
		boxShadowVec: "2px 8px 9px -4px",
		iconFill: defaultFill,
		iconStroke: defaultStroke,
		iconStrokeWidth: defaultStrokeWidth,
		textColor: "white"
	};

	let { glyph = null } = $$props;
	let { href = null } = $$props;
	let { iconSize = defaultSize } = $$props;
	let { text = defaultText } = $$props;
	let { theme = null } = $$props;
	const writable_props = ["glyph", "href", "iconSize", "text", "theme"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LinkButton> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("glyph" in $$props) $$invalidate(3, glyph = $$props.glyph);
		if ("href" in $$props) $$invalidate(4, href = $$props.href);
		if ("iconSize" in $$props) $$invalidate(0, iconSize = $$props.iconSize);
		if ("text" in $$props) $$invalidate(1, text = $$props.text);
		if ("theme" in $$props) $$invalidate(2, theme = $$props.theme);
	};

	$$self.$capture_state = () => ({
		makeStyleVars,
		Icon,
		defaultFill,
		defaultSize,
		defaultStroke,
		defaultStrokeWidth,
		defaultText,
		defaultTheme,
		missingHrefText,
		glyph,
		href,
		iconSize,
		text,
		theme,
		style
	});

	$$self.$inject_state = $$props => {
		if ("glyph" in $$props) $$invalidate(3, glyph = $$props.glyph);
		if ("href" in $$props) $$invalidate(4, href = $$props.href);
		if ("iconSize" in $$props) $$invalidate(0, iconSize = $$props.iconSize);
		if ("text" in $$props) $$invalidate(1, text = $$props.text);
		if ("theme" in $$props) $$invalidate(2, theme = $$props.theme);
		if ("style" in $$props) $$invalidate(5, style = $$props.style);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*iconSize*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, iconSize = iconSize || defaultSize);
		}

		if ($$self.$$.dirty & /*theme*/ 4) {
			$$invalidate(2, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty & /*theme*/ 4) {
			$$invalidate(5, style = makeStyleVars(theme));
		}

		if ($$self.$$.dirty & /*text*/ 2) {
			$$invalidate(1, text = text || defaultText);
		}
	};

	return [iconSize, text, theme, glyph, href, style];
}

class LinkButton extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			glyph: 3,
			href: 4,
			iconSize: 0,
			text: 1,
			theme: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "LinkButton",
			options,
			id: create_fragment$2.name
		});
	}

	get glyph() {
		throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set glyph(value) {
		throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get href() {
		throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconSize() {
		throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconSize(value) {
		throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<LinkButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<LinkButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/ui/src/MessageView.svelte generated by Svelte v3.38.2 */

const file$1 = "../../components/ui/src/MessageView.svelte";

function create_fragment$1(ctx) {
	let div;
	let span;
	let t;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			t = text(/*text*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, /*text*/ ctx[0]);
			span_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$1, 17, 1, 413);
			attr_dev(div, "class", "MessageView svelte-1byqwkv");
			attr_dev(div, "style", /*style*/ ctx[1]);
			add_location(div, file$1, 16, 0, 378);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, span);
			append_dev(span, t);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*text*/ 1) set_data_dev(t, /*text*/ ctx[0]);

			if (dirty & /*style*/ 2) {
				attr_dev(div, "style", /*style*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
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

function instance$1($$self, $$props, $$invalidate) {
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("MessageView", slots, []);
	let { backgroundColor = null } = $$props;
	let { color = null } = $$props;
	let { fontSize = null } = $$props;
	let { text = null } = $$props;
	const writable_props = ["backgroundColor", "color", "fontSize", "text"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MessageView> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("backgroundColor" in $$props) $$invalidate(2, backgroundColor = $$props.backgroundColor);
		if ("color" in $$props) $$invalidate(3, color = $$props.color);
		if ("fontSize" in $$props) $$invalidate(4, fontSize = $$props.fontSize);
		if ("text" in $$props) $$invalidate(0, text = $$props.text);
	};

	$$self.$capture_state = () => ({
		backgroundColor,
		color,
		fontSize,
		text,
		style
	});

	$$self.$inject_state = $$props => {
		if ("backgroundColor" in $$props) $$invalidate(2, backgroundColor = $$props.backgroundColor);
		if ("color" in $$props) $$invalidate(3, color = $$props.color);
		if ("fontSize" in $$props) $$invalidate(4, fontSize = $$props.fontSize);
		if ("text" in $$props) $$invalidate(0, text = $$props.text);
		if ("style" in $$props) $$invalidate(1, style = $$props.style);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*text*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, text = text ?? "Please provide a message");
		}

		if ($$self.$$.dirty & /*backgroundColor, color, fontSize*/ 28) {
			$$invalidate(1, style = {
				"--backgroundColor": backgroundColor || "white",
				"--color": color || "black",
				"--fontSize": fontSize || "14px"
			});
		}
	};

	return [text, style, backgroundColor, color, fontSize];
}

class MessageView extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			backgroundColor: 2,
			color: 3,
			fontSize: 4,
			text: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MessageView",
			options,
			id: create_fragment$1.name
		});
	}

	get backgroundColor() {
		throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set backgroundColor(value) {
		throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fontSize() {
		throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fontSize(value) {
		throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<MessageView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<MessageView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var IDX=36, HEX='';
while (IDX--) HEX += IDX.toString(36);

function uid (len) {
	var str='', num = len || 11;
	while (num--) str += HEX[Math.random() * 36 | 0];
	return str;
}

/* ../../components/ui/src/Switch.svelte generated by Svelte v3.38.2 */
const file = "../../components/ui/src/Switch.svelte";

// (39:2) {#if !hideLabels}
function create_if_block_1(ctx) {
	let label;
	let t_value = /*values*/ ctx[0][0] + "";
	let t;

	const block = {
		c: function create() {
			label = element("label");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			t = claim_text(label_nodes, t_value);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(label, "for", "left-" + /*id*/ ctx[5]);
			attr_dev(label, "class", "svelte-1yh7a7q");
			toggle_class(label, "greyed", /*currentValue*/ ctx[2] !== /*values*/ ctx[0][0]);
			add_location(label, file, 39, 3, 924);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label, anchor);
			append_dev(label, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*values*/ 1 && t_value !== (t_value = /*values*/ ctx[0][0] + "")) set_data_dev(t, t_value);

			if (dirty & /*currentValue, values*/ 5) {
				toggle_class(label, "greyed", /*currentValue*/ ctx[2] !== /*values*/ ctx[0][0]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(39:2) {#if !hideLabels}",
		ctx
	});

	return block;
}

// (61:2) {#if !hideLabels}
function create_if_block(ctx) {
	let label;
	let t_value = /*values*/ ctx[0][1] + "";
	let t;

	const block = {
		c: function create() {
			label = element("label");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			t = claim_text(label_nodes, t_value);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(label, "for", "right-" + /*id*/ ctx[5]);
			attr_dev(label, "class", "svelte-1yh7a7q");
			toggle_class(label, "greyed", /*currentValue*/ ctx[2] !== /*values*/ ctx[0][1]);
			add_location(label, file, 61, 3, 1409);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label, anchor);
			append_dev(label, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*values*/ 1 && t_value !== (t_value = /*values*/ ctx[0][1] + "")) set_data_dev(t, t_value);

			if (dirty & /*currentValue, values*/ 5) {
				toggle_class(label, "greyed", /*currentValue*/ ctx[2] !== /*values*/ ctx[0][1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(61:2) {#if !hideLabels}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let fieldset;
	let t0;
	let span2;
	let input0;
	let input0_value_value;
	let t1;
	let input1;
	let input1_value_value;
	let t2;
	let span0;
	let t3;
	let span1;
	let t4;
	let mounted;
	let dispose;
	let if_block0 = !/*hideLabels*/ ctx[1] && create_if_block_1(ctx);
	let if_block1 = !/*hideLabels*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			div = element("div");
			fieldset = element("fieldset");
			if (if_block0) if_block0.c();
			t0 = space();
			span2 = element("span");
			input0 = element("input");
			t1 = space();
			input1 = element("input");
			t2 = space();
			span0 = element("span");
			t3 = space();
			span1 = element("span");
			t4 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			fieldset = claim_element(div_nodes, "FIELDSET", { role: true, class: true });
			var fieldset_nodes = children(fieldset);
			if (if_block0) if_block0.l(fieldset_nodes);
			t0 = claim_space(fieldset_nodes);
			span2 = claim_element(fieldset_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);

			input0 = claim_element(span2_nodes, "INPUT", {
				type: true,
				id: true,
				value: true,
				class: true
			});

			t1 = claim_space(span2_nodes);

			input1 = claim_element(span2_nodes, "INPUT", {
				type: true,
				id: true,
				value: true,
				class: true
			});

			t2 = claim_space(span2_nodes);
			span0 = claim_element(span2_nodes, "SPAN", { "aria-hidden": true, class: true });
			children(span0).forEach(detach_dev);
			t3 = claim_space(span2_nodes);
			span1 = claim_element(span2_nodes, "SPAN", { "aria-hidden": true, class: true });
			children(span1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			t4 = claim_space(fieldset_nodes);
			if (if_block1) if_block1.l(fieldset_nodes);
			fieldset_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(input0, "type", "radio");
			attr_dev(input0, "id", "left-" + /*id*/ ctx[5]);
			input0.__value = input0_value_value = /*values*/ ctx[0][0];
			input0.value = input0.__value;
			attr_dev(input0, "class", "svelte-1yh7a7q");
			/*$$binding_groups*/ ctx[10][0].push(input0);
			add_location(input0, file, 45, 3, 1071);
			attr_dev(input1, "type", "radio");
			attr_dev(input1, "id", "right-" + /*id*/ ctx[5]);
			input1.__value = input1_value_value = /*values*/ ctx[0][1];
			input1.value = input1.__value;
			attr_dev(input1, "class", "svelte-1yh7a7q");
			/*$$binding_groups*/ ctx[10][0].push(input1);
			add_location(input1, file, 51, 3, 1176);
			attr_dev(span0, "aria-hidden", "true");
			attr_dev(span0, "class", "bkg svelte-1yh7a7q");
			add_location(span0, file, 57, 3, 1282);
			attr_dev(span1, "aria-hidden", "true");
			attr_dev(span1, "class", "knob svelte-1yh7a7q");
			add_location(span1, file, 58, 3, 1330);
			attr_dev(span2, "class", "wrapper svelte-1yh7a7q");
			toggle_class(span2, "isRight", /*isRight*/ ctx[3]);
			add_location(span2, file, 44, 2, 1031);
			attr_dev(fieldset, "role", "radiogroup");
			attr_dev(fieldset, "class", "svelte-1yh7a7q");
			add_location(fieldset, file, 37, 1, 872);
			attr_dev(div, "class", "switch svelte-1yh7a7q");
			attr_dev(div, "style", /*style*/ ctx[4]);
			add_location(div, file, 36, 0, 824);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, fieldset);
			if (if_block0) if_block0.m(fieldset, null);
			append_dev(fieldset, t0);
			append_dev(fieldset, span2);
			append_dev(span2, input0);
			input0.checked = input0.__value === /*currentValue*/ ctx[2];
			append_dev(span2, t1);
			append_dev(span2, input1);
			input1.checked = input1.__value === /*currentValue*/ ctx[2];
			append_dev(span2, t2);
			append_dev(span2, span0);
			append_dev(span2, t3);
			append_dev(span2, span1);
			append_dev(fieldset, t4);
			if (if_block1) if_block1.m(fieldset, null);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "change", /*input0_change_handler*/ ctx[9]),
					listen_dev(input1, "change", /*input1_change_handler*/ ctx[11]),
					listen_dev(div, "click", /*toggle*/ ctx[6], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (!/*hideLabels*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(fieldset, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*values*/ 1 && input0_value_value !== (input0_value_value = /*values*/ ctx[0][0])) {
				prop_dev(input0, "__value", input0_value_value);
				input0.value = input0.__value;
			}

			if (dirty & /*currentValue*/ 4) {
				input0.checked = input0.__value === /*currentValue*/ ctx[2];
			}

			if (dirty & /*values*/ 1 && input1_value_value !== (input1_value_value = /*values*/ ctx[0][1])) {
				prop_dev(input1, "__value", input1_value_value);
				input1.value = input1.__value;
			}

			if (dirty & /*currentValue*/ 4) {
				input1.checked = input1.__value === /*currentValue*/ ctx[2];
			}

			if (dirty & /*isRight*/ 8) {
				toggle_class(span2, "isRight", /*isRight*/ ctx[3]);
			}

			if (!/*hideLabels*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(fieldset, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*style*/ 16) {
				attr_dev(div, "style", /*style*/ ctx[4]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			/*$$binding_groups*/ ctx[10][0].splice(/*$$binding_groups*/ ctx[10][0].indexOf(input0), 1);
			/*$$binding_groups*/ ctx[10][0].splice(/*$$binding_groups*/ ctx[10][0].indexOf(input1), 1);
			if (if_block1) if_block1.d();
			mounted = false;
			run_all(dispose);
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

function instance($$self, $$props, $$invalidate) {
	let currentValue;
	let isRight;
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Switch", slots, []);
	const dispatch = createEventDispatcher();

	const defaultTheme = {
		height: "24px",
		color: "grey",
		backgroundColor: "white",
		knobColor: "lightgrey"
	};

	let { value = null } = $$props;
	let { values = null } = $$props;
	let { theme = null } = $$props;
	let { hideLabels = false } = $$props;
	const id = uid();

	function toggle() {
		$$invalidate(2, currentValue = currentValue === values[0] ? values[1] : values[0]);
		dispatch("toggled", currentValue);
	}

	const writable_props = ["value", "values", "theme", "hideLabels"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Switch> was created with unknown prop '${key}'`);
	});

	const $$binding_groups = [[]];

	function input0_change_handler() {
		currentValue = this.__value;
		(($$invalidate(2, currentValue), $$invalidate(8, value)), $$invalidate(0, values));
	}

	function input1_change_handler() {
		currentValue = this.__value;
		(($$invalidate(2, currentValue), $$invalidate(8, value)), $$invalidate(0, values));
	}

	$$self.$$set = $$props => {
		if ("value" in $$props) $$invalidate(8, value = $$props.value);
		if ("values" in $$props) $$invalidate(0, values = $$props.values);
		if ("theme" in $$props) $$invalidate(7, theme = $$props.theme);
		if ("hideLabels" in $$props) $$invalidate(1, hideLabels = $$props.hideLabels);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		makeStyleVars,
		uid,
		dispatch,
		defaultTheme,
		value,
		values,
		theme,
		hideLabels,
		id,
		toggle,
		currentValue,
		isRight,
		style
	});

	$$self.$inject_state = $$props => {
		if ("value" in $$props) $$invalidate(8, value = $$props.value);
		if ("values" in $$props) $$invalidate(0, values = $$props.values);
		if ("theme" in $$props) $$invalidate(7, theme = $$props.theme);
		if ("hideLabels" in $$props) $$invalidate(1, hideLabels = $$props.hideLabels);
		if ("currentValue" in $$props) $$invalidate(2, currentValue = $$props.currentValue);
		if ("isRight" in $$props) $$invalidate(3, isRight = $$props.isRight);
		if ("style" in $$props) $$invalidate(4, style = $$props.style);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value, values*/ 257) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(2, currentValue = value || values[0]);
		}

		if ($$self.$$.dirty & /*currentValue, values*/ 5) {
			$$invalidate(3, isRight = currentValue === values[1]);
		}

		if ($$self.$$.dirty & /*theme*/ 128) {
			$$invalidate(7, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty & /*theme*/ 128) {
			$$invalidate(4, style = makeStyleVars(theme));
		}
	};

	return [
		values,
		hideLabels,
		currentValue,
		isRight,
		style,
		id,
		toggle,
		theme,
		value,
		input0_change_handler,
		$$binding_groups,
		input1_change_handler
	];
}

class Switch extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			value: 8,
			values: 0,
			theme: 7,
			hideLabels: 1
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Switch",
			options,
			id: create_fragment.name
		});
	}

	get value() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get values() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set values(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hideLabels() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hideLabels(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { ColorBinsG as C, ExternalLink as E, Globe as G, Link as L, MessageView as M, Switch as S, arrayMaxWith as a, getValuesLength as b, areValidBins as c, getBinsItems as d, exactAmountBins as e, getBinsMax as f, getBinsTicks as g, getBinsMin as h, getBinsExtent as i, isNonEmptyBin as j, findFirstNonEmptyBinIndex as k, findLastNonEmptyBinIndex as l, getTrimmedBinsStats as m, getBinsTicksExtent as n, getNonEmptyBinsTicks as o, ColorBinsDiv as p, LinkButton as q, CheckSquare as r, ChevronDown as s, ChevronUp as t, Square as u, vectorLength2D as v, arrayMinWith as w, extent as x };
