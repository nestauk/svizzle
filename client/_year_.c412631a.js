import { c3 as every, c2 as identity, cx as derived, Z as pipe, U as mapWith, cR as applyFnMap, bQ as sortWith, cd as sorterDesc, cW as keyValueArrayToObject, cH as mapValues, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, am as validate_store, av as component_subscribe, v as validate_slots, bg as onMount, cX as makeStyle, bI as toPx, bp as mergeObj, ar as _, bf as writable, br as has, b$ as map, e as element, D as create_component, a as space, f as claim_element, g as children, E as claim_component, c as claim_space, b as detach_dev, k as attr_dev, H as toggle_class, m as add_location, n as insert_hydration_dev, F as mount_component, o as append_hydration_dev, w as group_outros, B as transition_out, x as check_outros, u as transition_in, G as destroy_component, bP as isIn, be as set_store_value, at as empty, p as noop, bm as add_render_callback, bn as add_iframe_resize_listener, M as listen_dev, q as validate_each_argument, I as svg_element, J as claim_svg_element, C as destroy_each, t as text, j as claim_text, a5 as set_data_dev } from './client.1e12038a.js';
import { w as makeGetRefFormatOf, x as keyValueArrayAverage, p as _lookup, l as _navFlags, e as _isSmallScreen, f as _screenClasses, g as _viewsClasses, t as setRoute, n as showView, y as setSelectedYear, v as lookup } from './stores.1e44d5fb.js';
import { B as BarchartVDiv, C as ChoroplethG, d as defaultGeometry } from './ChoroplethG.3a3bdce3.js';
import { t as ColorBinsDiv, s as ColorBinsG, M as MessageView } from './ColorBinsDiv.aa2166f1.js';
import { L as LoadingView } from './topojson.b6a5697a.js';
import { c as _colorScale, H as Header, t as toggleInfoModal, a as _isCurrentDataEmpty, b as _colorBins, d as _geoModal, e as _infoModal, G as GeoFilterModal, I as InfoModal, f as InfoView, S as SettingsRow, g as SettingsView, h as hideGeoModal, i as hideInfoModal, j as toggleGeoModal, k as config, l as types } from './types.53854248.js';
import { g as getAtlasId, i as idToNutsIdByYear, e as _getAtlasIdFromRegionId, d as _POIs, f as _getRegionIdFromAtlasId, h as _isTopoFetching, j as _filteredGeojson, k as _euGeojson } from './POIs.92d73b65.js';
import { I as getRegionAtlasId, m as _getIndicatorValue, G as _yearSelectionData, c as _regionSettings, f as _regionsYearSpec, J as hierarchy, p as _indicator, j as _doFilterRegions, l as _formatFn, g as _selectedRegionAtlasIds, _ as _theme, K as _selectedRegionIds, o as _isRegionsSelectionDirty, q as setCurrentLevel, L as regionIdToName, r as parseCSV } from './indicator.48d53809.js';
import { g as getValue } from './defaultLocale.3257a737.js';
import { o as projectionFn } from './equalEarth.d678dfdc.js';
import './linear.8b755bc2.js';
import './index.2a4e05c3.js';
import './Link.36cf34ba.js';
import './quantize.82373663.js';
import './rgb.f19d26e1.js';
import './Info.0ccb000f.js';

/**
* @module @svizzle/utils/array-boolean
*/

/**
 * Return true if all elements of the provided array are truthy
 *
 * @function
 * @arg {array} array
 * @return {boolean}
 *
 * @example
> areAllTruthy([true, true])
true
> areAllTruthy([1, [], [1, 2], {}, {a: 1}, 'a'])
true
> areAllTruthy([false, true])
false
> areAllTruthy([0, {a: 1}])
false
> areAllTruthy(['', {a: 1}])
false
 *
 * @since 0.1.0
 */
const areAllTruthy = every(identity);

/* mappings */

const _regionIdValuePairs = derived(
	[_getIndicatorValue, _yearSelectionData],
	([getIndicatorValue, yearSelectionData]) => {
		let items = [];

		if (yearSelectionData) {
			const makeItems = pipe([
				mapWith(applyFnMap({
					key: getRegionAtlasId,
					value: getIndicatorValue
				})),
				sortWith([sorterDesc(getValue)])
			]);

			items = makeItems(yearSelectionData);
		}

		return items;
	}
);

const _regionIdToValue =
	derived(_regionIdValuePairs, keyValueArrayToObject);

const _regionIdToColor = derived(
	[_colorScale, _regionIdToValue],
	([colorScale, regionIdToValue]) => mapValues(regionIdToValue, colorScale)
);

// FIXME this could be removed once we have `atlasId` in the topojson
// https://github.com/nestauk/svizzle/issues/394
const _regionIdToColorFn = derived(
	[_regionIdToColor, _regionSettings, _regionsYearSpec],
	([regionIdToColor, regionSettings, specYear]) =>
		regionId => {
			const atlasId = getAtlasId({
				regionId,
				specYear,
				type: regionSettings.type
			});
			const color = regionIdToColor[atlasId];

			return color;
		}
);

const _regionIdToBarchartLabel = derived(
	_regionsYearSpec,
	regionsYearSpec => mapValues(hierarchy, ({name, rootId}) => {
		const rootOriginalId = idToNutsIdByYear[rootId][regionsYearSpec];

		return `${name}, ${rootOriginalId}`
	})
);


/* barchart */

const _barchartRefs = derived(
	[_indicator, _lookup, _regionIdValuePairs],
	([indicator, lookup, regionIdValuePairs]) => {
		const getRefFormatFn = makeGetRefFormatOf(indicator.id);
		const formatFn = getRefFormatFn(lookup);

		return [{
			key: 'Average',
			keyAbbr: 'Avg.',
			value: keyValueArrayAverage(regionIdValuePairs),
			formatFn
		}];
	}
);

/* ../../components/time_region_value/src/routes/[id]/[year].svelte generated by Svelte v3.59.2 */

const file = "../../components/time_region_value/src/routes/[id]/[year].svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[82] = list[i].isLeft;
	child_ctx[83] = list[i].name;
	child_ctx[84] = list[i].X;
	child_ctx[85] = list[i].Y;
	child_ctx[86] = list[i].dx;
	child_ctx[87] = list[i].dy;
	return child_ctx;
}

// (482:2) {:else}
function create_else_block_5(ctx) {
	let div0;
	let settingsrow;
	let t0;
	let div1;
	let current_block_type_index;
	let if_block0;
	let t1;
	let t2;
	let if_block2_anchor;
	let current;

	settingsrow = new SettingsRow({
			props: {
				flags: {
					doFilter: /*$_doFilterRegions*/ ctx[5],
					isGeoModalVisible: /*$_geoModal*/ ctx[45].isVisible,
					isRegionsSelectionDirty: /*$_isRegionsSelectionDirty*/ ctx[46],
					showRankingControl: false
				},
				handlers: {
					setLevel: /*setLevel*/ ctx[55],
					toggledFiltering: /*toggledFiltering*/ ctx[56],
					toggledGeoModal: toggleGeoModal
				}
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block_8, create_else_block_6];
	const if_blocks = [];

	function select_block_type_6(ctx, dirty) {
		if (/*$_isCurrentDataEmpty*/ ctx[35]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_6(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = /*$_geoModal*/ ctx[45].isVisible && create_if_block_7(ctx);
	let if_block2 = /*$_infoModal*/ ctx[47].isVisible && create_if_block_6(ctx);

	const block = {
		c: function create() {
			div0 = element("div");
			create_component(settingsrow.$$.fragment);
			t0 = space();
			div1 = element("div");
			if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(settingsrow.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if_block0.l(div1_nodes);
			t1 = claim_space(div1_nodes);
			if (if_block1) if_block1.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			if (if_block2) if_block2.l(nodes);
			if_block2_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "topbox svelte-g8ldqp");
			add_location(div0, file, 487, 3, 11718);
			attr_dev(div1, "class", "content svelte-g8ldqp");
			toggle_class(div1, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			add_location(div1, file, 505, 3, 12097);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);
			mount_component(settingsrow, div0, null);
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, div1, anchor);
			if_blocks[current_block_type_index].m(div1, null);
			append_hydration_dev(div1, t1);
			if (if_block1) if_block1.m(div1, null);
			insert_hydration_dev(target, t2, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert_hydration_dev(target, if_block2_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const settingsrow_changes = {};

			if (dirty[0] & /*$_doFilterRegions*/ 32 | dirty[1] & /*$_geoModal, $_isRegionsSelectionDirty*/ 49152) settingsrow_changes.flags = {
				doFilter: /*$_doFilterRegions*/ ctx[5],
				isGeoModalVisible: /*$_geoModal*/ ctx[45].isVisible,
				isRegionsSelectionDirty: /*$_isRegionsSelectionDirty*/ ctx[46],
				showRankingControl: false
			};

			settingsrow.$set(settingsrow_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_6(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div1, t1);
			}

			if (/*$_geoModal*/ ctx[45].isVisible) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[1] & /*$_geoModal*/ 16384) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_7(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty[1] & /*$_isCurrentDataEmpty*/ 16) {
				toggle_class(div1, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			}

			if (/*$_infoModal*/ ctx[47].isVisible) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[1] & /*$_infoModal*/ 65536) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_6(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(settingsrow.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(settingsrow.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(settingsrow);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			if_blocks[current_block_type_index].d();
			if (if_block1) if_block1.d();
			if (detaching) detach_dev(t2);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach_dev(if_block2_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_5.name,
		type: "else",
		source: "(482:2) {:else}",
		ctx
	});

	return block;
}

// (310:2) {#if $_isSmallScreen}
function create_if_block(ctx) {
	let div0;
	let current_block_type_index;
	let if_block0;
	let t0;
	let div1;
	let current_block_type_index_1;
	let if_block1;
	let t1;
	let div2;
	let infoview;
	let t2;
	let div3;
	let settingsview;
	let current;
	const if_block_creators = [create_if_block_3, create_else_block_2];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*$_isCurrentDataEmpty*/ ctx[35]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const if_block_creators_1 = [create_if_block_1, create_else_block];
	const if_blocks_1 = [];

	function select_block_type_4(ctx, dirty) {
		if (/*$_isCurrentDataEmpty*/ ctx[35]) return 0;
		return 1;
	}

	current_block_type_index_1 = select_block_type_4(ctx);
	if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);

	infoview = new InfoView({
			props: {
				api_doc_url: /*api_doc_url*/ ctx[32],
				api_type: /*api_type*/ ctx[31],
				auth_provider: /*auth_provider*/ ctx[30],
				data_date: /*data_date*/ ctx[29],
				description: /*description*/ ctx[28],
				endpoint_url: /*endpoint_url*/ ctx[27],
				is_experimental: /*is_experimental*/ ctx[26],
				is_public: /*is_public*/ ctx[25],
				query: /*query*/ ctx[24],
				region_types: /*region_types*/ ctx[23],
				source_name: /*source_name*/ ctx[22],
				source_url: /*source_url*/ ctx[21],
				url: /*url*/ ctx[18],
				warning: /*warning*/ ctx[17],
				year_extent: /*year_extent*/ ctx[16]
			},
			$$inline: true
		});

	settingsview = new SettingsView({
			props: {
				flags: {
					doFilter: /*$_doFilterRegions*/ ctx[5],
					showRankingControl: false
				},
				handlers: {
					setLevel: /*setLevel*/ ctx[55],
					toggledFiltering: /*toggledFiltering*/ ctx[56]
				}
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div0 = element("div");
			if_block0.c();
			t0 = space();
			div1 = element("div");
			if_block1.c();
			t1 = space();
			div2 = element("div");
			create_component(infoview.$$.fragment);
			t2 = space();
			div3 = element("div");
			create_component(settingsview.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block0.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if_block1.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			claim_component(infoview.$$.fragment, div2_nodes);
			div2_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			claim_component(settingsview.$$.fragment, div3_nodes);
			div3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "view map svelte-g8ldqp");
			toggle_class(div0, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			add_location(div0, file, 315, 3, 7910);
			attr_dev(div1, "class", "view barchart svelte-g8ldqp");
			toggle_class(div1, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			add_location(div1, file, 393, 3, 9813);
			attr_dev(div2, "class", "view info svelte-g8ldqp");
			add_location(div2, file, 446, 3, 11095);
			attr_dev(div3, "class", "view settings svelte-g8ldqp");
			add_location(div3, file, 468, 3, 11443);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);
			if_blocks[current_block_type_index].m(div0, null);
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, div1, anchor);
			if_blocks_1[current_block_type_index_1].m(div1, null);
			insert_hydration_dev(target, t1, anchor);
			insert_hydration_dev(target, div2, anchor);
			mount_component(infoview, div2, null);
			insert_hydration_dev(target, t2, anchor);
			insert_hydration_dev(target, div3, anchor);
			mount_component(settingsview, div3, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div0, null);
			}

			if (!current || dirty[1] & /*$_isCurrentDataEmpty*/ 16) {
				toggle_class(div0, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_4(ctx);

			if (current_block_type_index_1 === previous_block_index_1) {
				if_blocks_1[current_block_type_index_1].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
					if_blocks_1[previous_block_index_1] = null;
				});

				check_outros();
				if_block1 = if_blocks_1[current_block_type_index_1];

				if (!if_block1) {
					if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(div1, null);
			}

			if (!current || dirty[1] & /*$_isCurrentDataEmpty*/ 16) {
				toggle_class(div1, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			}

			const infoview_changes = {};
			if (dirty[1] & /*api_doc_url*/ 2) infoview_changes.api_doc_url = /*api_doc_url*/ ctx[32];
			if (dirty[1] & /*api_type*/ 1) infoview_changes.api_type = /*api_type*/ ctx[31];
			if (dirty[0] & /*auth_provider*/ 1073741824) infoview_changes.auth_provider = /*auth_provider*/ ctx[30];
			if (dirty[0] & /*data_date*/ 536870912) infoview_changes.data_date = /*data_date*/ ctx[29];
			if (dirty[0] & /*description*/ 268435456) infoview_changes.description = /*description*/ ctx[28];
			if (dirty[0] & /*endpoint_url*/ 134217728) infoview_changes.endpoint_url = /*endpoint_url*/ ctx[27];
			if (dirty[0] & /*is_experimental*/ 67108864) infoview_changes.is_experimental = /*is_experimental*/ ctx[26];
			if (dirty[0] & /*is_public*/ 33554432) infoview_changes.is_public = /*is_public*/ ctx[25];
			if (dirty[0] & /*query*/ 16777216) infoview_changes.query = /*query*/ ctx[24];
			if (dirty[0] & /*region_types*/ 8388608) infoview_changes.region_types = /*region_types*/ ctx[23];
			if (dirty[0] & /*source_name*/ 4194304) infoview_changes.source_name = /*source_name*/ ctx[22];
			if (dirty[0] & /*source_url*/ 2097152) infoview_changes.source_url = /*source_url*/ ctx[21];
			if (dirty[0] & /*url*/ 262144) infoview_changes.url = /*url*/ ctx[18];
			if (dirty[0] & /*warning*/ 131072) infoview_changes.warning = /*warning*/ ctx[17];
			if (dirty[0] & /*year_extent*/ 65536) infoview_changes.year_extent = /*year_extent*/ ctx[16];
			infoview.$set(infoview_changes);
			const settingsview_changes = {};

			if (dirty[0] & /*$_doFilterRegions*/ 32) settingsview_changes.flags = {
				doFilter: /*$_doFilterRegions*/ ctx[5],
				showRankingControl: false
			};

			settingsview.$set(settingsview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(infoview.$$.fragment, local);
			transition_in(settingsview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(infoview.$$.fragment, local);
			transition_out(settingsview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if_blocks[current_block_type_index].d();
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			if_blocks_1[current_block_type_index_1].d();
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div2);
			destroy_component(infoview);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div3);
			destroy_component(settingsview);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(310:2) {#if $_isSmallScreen}",
		ctx
	});

	return block;
}

// (512:4) {:else}
function create_else_block_6(ctx) {
	let div0;
	let current_block_type_index;
	let if_block;
	let div0_resize_listener;
	let t;
	let div1;
	let barchartvdiv;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_9, create_else_block_7];
	const if_blocks = [];

	function select_block_type_7(ctx, dirty) {
		if (/*showMap*/ ctx[13]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_7(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	barchartvdiv = new BarchartVDiv({
			props: {
				formatFn: /*$_formatFn*/ ctx[33],
				heroKey: /*focusedAtlasId*/ ctx[2],
				isInteractive: true,
				items: /*$_regionIdValuePairs*/ ctx[7],
				keyToColor: /*$_regionIdToColor*/ ctx[42],
				keyToLabel: /*$_regionIdToBarchartLabel*/ ctx[43],
				refs: /*$_barchartRefs*/ ctx[44],
				selectedKeys: /*barchartSelectedKeys*/ ctx[10],
				shouldResetScroll: true,
				shouldScrollToHeroKey: true,
				theme: /*barchartTheme*/ ctx[48],
				title: /*barchartTitle*/ ctx[14]
			},
			$$inline: true
		});

	barchartvdiv.$on("entered", /*onEnteredBar*/ ctx[53]);
	barchartvdiv.$on("exited", /*onExitedBar*/ ctx[54]);

	const block = {
		c: function create() {
			div0 = element("div");
			if_block.c();
			t = space();
			div1 = element("div");
			create_component(barchartvdiv.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(barchartvdiv.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "map svelte-g8ldqp");
			add_render_callback(() => /*div0_elementresize_handler*/ ctx[76].call(div0));
			add_location(div0, file, 515, 5, 12284);
			attr_dev(div1, "class", "barchart svelte-g8ldqp");
			add_location(div1, file, 629, 5, 15045);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);
			if_blocks[current_block_type_index].m(div0, null);
			div0_resize_listener = add_iframe_resize_listener(div0, /*div0_elementresize_handler*/ ctx[76].bind(div0));
			insert_hydration_dev(target, t, anchor);
			insert_hydration_dev(target, div1, anchor);
			mount_component(barchartvdiv, div1, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(div0, "mousemove", /*onMousemoved*/ ctx[52], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_7(ctx);

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
				if_block.m(div0, null);
			}

			const barchartvdiv_changes = {};
			if (dirty[1] & /*$_formatFn*/ 4) barchartvdiv_changes.formatFn = /*$_formatFn*/ ctx[33];
			if (dirty[0] & /*focusedAtlasId*/ 4) barchartvdiv_changes.heroKey = /*focusedAtlasId*/ ctx[2];
			if (dirty[0] & /*$_regionIdValuePairs*/ 128) barchartvdiv_changes.items = /*$_regionIdValuePairs*/ ctx[7];
			if (dirty[1] & /*$_regionIdToColor*/ 2048) barchartvdiv_changes.keyToColor = /*$_regionIdToColor*/ ctx[42];
			if (dirty[1] & /*$_regionIdToBarchartLabel*/ 4096) barchartvdiv_changes.keyToLabel = /*$_regionIdToBarchartLabel*/ ctx[43];
			if (dirty[1] & /*$_barchartRefs*/ 8192) barchartvdiv_changes.refs = /*$_barchartRefs*/ ctx[44];
			if (dirty[0] & /*barchartSelectedKeys*/ 1024) barchartvdiv_changes.selectedKeys = /*barchartSelectedKeys*/ ctx[10];
			if (dirty[0] & /*barchartTitle*/ 16384) barchartvdiv_changes.title = /*barchartTitle*/ ctx[14];
			barchartvdiv.$set(barchartvdiv_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(barchartvdiv.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(barchartvdiv.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if_blocks[current_block_type_index].d();
			div0_resize_listener();
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div1);
			destroy_component(barchartvdiv);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_6.name,
		type: "else",
		source: "(512:4) {:else}",
		ctx
	});

	return block;
}

// (510:4) {#if $_isCurrentDataEmpty}
function create_if_block_8(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: config.noDataMessage },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(messageview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(messageview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(messageview, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(messageview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(messageview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(messageview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(510:4) {#if $_isCurrentDataEmpty}",
		ctx
	});

	return block;
}

// (620:6) {:else}
function create_else_block_7(ctx) {
	let loadingview;
	let current;

	loadingview = new LoadingView({
			props: {
				message: fetchingMessage,
				stroke: /*$_theme*/ ctx[38].colorMain
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(loadingview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(loadingview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(loadingview, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loadingview_changes = {};
			if (dirty[1] & /*$_theme*/ 128) loadingview_changes.stroke = /*$_theme*/ ctx[38].colorMain;
			loadingview.$set(loadingview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(loadingview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(loadingview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_7.name,
		type: "else",
		source: "(620:6) {:else}",
		ctx
	});

	return block;
}

// (522:6) {#if showMap}
function create_if_block_9(ctx) {
	let svg;
	let choroplethg;
	let if_block0_anchor;
	let t;
	let if_block2_anchor;
	let current;

	choroplethg = new ChoroplethG({
			props: {
				projection: /*projection*/ ctx[4],
				focusedKey: /*focusedRegionId*/ ctx[12],
				geojson: /*$_euGeojson*/ ctx[8],
				geometry: { left: /*choroplethSafety*/ ctx[3].left },
				height: /*mapHeight*/ ctx[0],
				isInteractive: true,
				key: /*$_regionSettings*/ ctx[39].key,
				keyToColorFn: /*$_regionIdToColorFn*/ ctx[40],
				selectedKeys: /*$_selectedRegionIds*/ ctx[41],
				theme: {
					defaultFill: defaultGray,
					defaultStroke: 'gray',
					defaultStrokeWidth: 0.25,
					focusedStroke: /*$_theme*/ ctx[38].colorBlack,
					focusedStrokeWidth: 1.5,
					selectedStroke: /*$_theme*/ ctx[38].colorBlack,
					selectedStrokeWidth: 0.5
				},
				width: /*mapWidth*/ ctx[1]
			},
			$$inline: true
		});

	choroplethg.$on("entered", /*onEnteredArea*/ ctx[50]);
	choroplethg.$on("exited", /*onExitedArea*/ ctx[51]);
	let if_block0 = /*POIsLayout*/ ctx[11] && create_if_block_13(ctx);
	let if_block1 = /*$_colorBins*/ ctx[37] && create_if_block_12(ctx);
	let if_block2 = /*$_tooltip*/ ctx[6].isVisible && create_if_block_10(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			create_component(choroplethg.$$.fragment);
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			t = space();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_svg_element(nodes, "svg", { height: true, width: true });
			var svg_nodes = children(svg);
			claim_component(choroplethg.$$.fragment, svg_nodes);
			if (if_block0) if_block0.l(svg_nodes);
			if_block0_anchor = empty();
			if (if_block1) if_block1.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			if (if_block2) if_block2.l(nodes);
			if_block2_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "height", /*mapHeight*/ ctx[0]);
			attr_dev(svg, "width", /*mapWidth*/ ctx[1]);
			add_location(svg, file, 522, 7, 12445);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, svg, anchor);
			mount_component(choroplethg, svg, null);
			if (if_block0) if_block0.m(svg, null);
			append_hydration_dev(svg, if_block0_anchor);
			if (if_block1) if_block1.m(svg, null);
			insert_hydration_dev(target, t, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert_hydration_dev(target, if_block2_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const choroplethg_changes = {};
			if (dirty[0] & /*projection*/ 16) choroplethg_changes.projection = /*projection*/ ctx[4];
			if (dirty[0] & /*focusedRegionId*/ 4096) choroplethg_changes.focusedKey = /*focusedRegionId*/ ctx[12];
			if (dirty[0] & /*$_euGeojson*/ 256) choroplethg_changes.geojson = /*$_euGeojson*/ ctx[8];
			if (dirty[0] & /*choroplethSafety*/ 8) choroplethg_changes.geometry = { left: /*choroplethSafety*/ ctx[3].left };
			if (dirty[0] & /*mapHeight*/ 1) choroplethg_changes.height = /*mapHeight*/ ctx[0];
			if (dirty[1] & /*$_regionSettings*/ 256) choroplethg_changes.key = /*$_regionSettings*/ ctx[39].key;
			if (dirty[1] & /*$_regionIdToColorFn*/ 512) choroplethg_changes.keyToColorFn = /*$_regionIdToColorFn*/ ctx[40];
			if (dirty[1] & /*$_selectedRegionIds*/ 1024) choroplethg_changes.selectedKeys = /*$_selectedRegionIds*/ ctx[41];

			if (dirty[1] & /*$_theme*/ 128) choroplethg_changes.theme = {
				defaultFill: defaultGray,
				defaultStroke: 'gray',
				defaultStrokeWidth: 0.25,
				focusedStroke: /*$_theme*/ ctx[38].colorBlack,
				focusedStrokeWidth: 1.5,
				selectedStroke: /*$_theme*/ ctx[38].colorBlack,
				selectedStrokeWidth: 0.5
			};

			if (dirty[0] & /*mapWidth*/ 2) choroplethg_changes.width = /*mapWidth*/ ctx[1];
			choroplethg.$set(choroplethg_changes);

			if (/*POIsLayout*/ ctx[11]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_13(ctx);
					if_block0.c();
					if_block0.m(svg, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*$_colorBins*/ ctx[37]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[1] & /*$_colorBins*/ 64) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_12(ctx);
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

			if (!current || dirty[0] & /*mapHeight*/ 1) {
				attr_dev(svg, "height", /*mapHeight*/ ctx[0]);
			}

			if (!current || dirty[0] & /*mapWidth*/ 2) {
				attr_dev(svg, "width", /*mapWidth*/ ctx[1]);
			}

			if (/*$_tooltip*/ ctx[6].isVisible) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_10(ctx);
					if_block2.c();
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(choroplethg.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(choroplethg.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			destroy_component(choroplethg);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (detaching) detach_dev(t);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach_dev(if_block2_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_9.name,
		type: "if",
		source: "(522:6) {#if showMap}",
		ctx
	});

	return block;
}

// (555:8) {#if POIsLayout}
function create_if_block_13(ctx) {
	let g;
	let each_value = /*POIsLayout*/ ctx[11];
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
			g = claim_svg_element(nodes, "g", { class: true });
			var g_nodes = children(g);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(g_nodes);
			}

			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "class", "POIs svelte-g8ldqp");
			add_location(g, file, 555, 9, 13346);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(g, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*POIsLayout*/ 2048) {
				each_value = /*POIsLayout*/ ctx[11];
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
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_13.name,
		type: "if",
		source: "(555:8) {#if POIsLayout}",
		ctx
	});

	return block;
}

// (557:10) {#each POIsLayout as {isLeft, name, X, Y, dx, dy}}
function create_each_block(ctx) {
	let g;
	let circle;
	let text0;
	let t0_value = /*name*/ ctx[83] + "";
	let t0;
	let text0_dx_value;
	let text0_dy_value;
	let text1;
	let t1_value = /*name*/ ctx[83] + "";
	let t1;
	let text1_dx_value;
	let text1_dy_value;
	let g_transform_value;

	const block = {
		c: function create() {
			g = svg_element("g");
			circle = svg_element("circle");
			text0 = svg_element("text");
			t0 = text(t0_value);
			text1 = svg_element("text");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { transform: true });
			var g_nodes = children(g);
			circle = claim_svg_element(g_nodes, "circle", { r: true, class: true });
			children(circle).forEach(detach_dev);

			text0 = claim_svg_element(g_nodes, "text", {
				dx: true,
				dy: true,
				class: true,
				"font-size": true
			});

			var text0_nodes = children(text0);
			t0 = claim_text(text0_nodes, t0_value);
			text0_nodes.forEach(detach_dev);

			text1 = claim_svg_element(g_nodes, "text", {
				dx: true,
				dy: true,
				"font-size": true,
				class: true
			});

			var text1_nodes = children(text1);
			t1 = claim_text(text1_nodes, t1_value);
			text1_nodes.forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "r", markerRadius);
			attr_dev(circle, "class", "svelte-g8ldqp");
			add_location(circle, file, 558, 12, 13482);
			attr_dev(text0, "dx", text0_dx_value = /*dx*/ ctx[86]);
			attr_dev(text0, "dy", text0_dy_value = /*dy*/ ctx[87]);
			attr_dev(text0, "class", "background svelte-g8ldqp");
			attr_dev(text0, "font-size", labelsFontSize);
			toggle_class(text0, "isLeft", /*isLeft*/ ctx[82]);
			add_location(text0, file, 559, 12, 13522);
			attr_dev(text1, "dx", text1_dx_value = /*dx*/ ctx[86]);
			attr_dev(text1, "dy", text1_dy_value = /*dy*/ ctx[87]);
			attr_dev(text1, "font-size", labelsFontSize);
			attr_dev(text1, "class", "svelte-g8ldqp");
			toggle_class(text1, "isLeft", /*isLeft*/ ctx[82]);
			add_location(text1, file, 566, 12, 13701);
			attr_dev(g, "transform", g_transform_value = "translate(" + /*X*/ ctx[84] + "," + /*Y*/ ctx[85] + ")");
			add_location(g, file, 557, 11, 13435);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			append_hydration_dev(g, circle);
			append_hydration_dev(g, text0);
			append_hydration_dev(text0, t0);
			append_hydration_dev(g, text1);
			append_hydration_dev(text1, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*POIsLayout*/ 2048 && t0_value !== (t0_value = /*name*/ ctx[83] + "")) set_data_dev(t0, t0_value);

			if (dirty[0] & /*POIsLayout*/ 2048 && text0_dx_value !== (text0_dx_value = /*dx*/ ctx[86])) {
				attr_dev(text0, "dx", text0_dx_value);
			}

			if (dirty[0] & /*POIsLayout*/ 2048 && text0_dy_value !== (text0_dy_value = /*dy*/ ctx[87])) {
				attr_dev(text0, "dy", text0_dy_value);
			}

			if (dirty[0] & /*POIsLayout*/ 2048) {
				toggle_class(text0, "isLeft", /*isLeft*/ ctx[82]);
			}

			if (dirty[0] & /*POIsLayout*/ 2048 && t1_value !== (t1_value = /*name*/ ctx[83] + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*POIsLayout*/ 2048 && text1_dx_value !== (text1_dx_value = /*dx*/ ctx[86])) {
				attr_dev(text1, "dx", text1_dx_value);
			}

			if (dirty[0] & /*POIsLayout*/ 2048 && text1_dy_value !== (text1_dy_value = /*dy*/ ctx[87])) {
				attr_dev(text1, "dy", text1_dy_value);
			}

			if (dirty[0] & /*POIsLayout*/ 2048) {
				toggle_class(text1, "isLeft", /*isLeft*/ ctx[82]);
			}

			if (dirty[0] & /*POIsLayout*/ 2048 && g_transform_value !== (g_transform_value = "translate(" + /*X*/ ctx[84] + "," + /*Y*/ ctx[85] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(557:10) {#each POIsLayout as {isLeft, name, X, Y, dx, dy}}",
		ctx
	});

	return block;
}

// (580:8) {#if $_colorBins}
function create_if_block_12(ctx) {
	let g;
	let colorbinsg;
	let g_transform_value;
	let current;

	colorbinsg = new ColorBinsG({
			props: {
				bins: /*$_colorBins*/ ctx[37],
				flags: { isVertical: true, withBackground: true },
				height: /*legendHeight*/ ctx[15],
				theme: {
					backgroundColor: /*$_theme*/ ctx[38].colorWhite,
					backgroundOpacity: 0.5
				},
				ticksFormatFn: /*$_formatFn*/ ctx[33],
				width: legendBarThickness
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			g = svg_element("g");
			create_component(colorbinsg.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			g = claim_svg_element(nodes, "g", { transform: true });
			var g_nodes = children(g);
			claim_component(colorbinsg.$$.fragment, g_nodes);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g, "transform", g_transform_value = "translate(0," + /*legendHeight*/ ctx[15] + ")");
			add_location(g, file, 580, 9, 13959);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, g, anchor);
			mount_component(colorbinsg, g, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const colorbinsg_changes = {};
			if (dirty[1] & /*$_colorBins*/ 64) colorbinsg_changes.bins = /*$_colorBins*/ ctx[37];
			if (dirty[0] & /*legendHeight*/ 32768) colorbinsg_changes.height = /*legendHeight*/ ctx[15];

			if (dirty[1] & /*$_theme*/ 128) colorbinsg_changes.theme = {
				backgroundColor: /*$_theme*/ ctx[38].colorWhite,
				backgroundOpacity: 0.5
			};

			if (dirty[1] & /*$_formatFn*/ 4) colorbinsg_changes.ticksFormatFn = /*$_formatFn*/ ctx[33];
			colorbinsg.$set(colorbinsg_changes);

			if (!current || dirty[0] & /*legendHeight*/ 32768 && g_transform_value !== (g_transform_value = "translate(0," + /*legendHeight*/ ctx[15] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
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
			if (detaching) detach_dev(g);
			destroy_component(colorbinsg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_12.name,
		type: "if",
		source: "(580:8) {#if $_colorBins}",
		ctx
	});

	return block;
}

// (603:7) {#if $_tooltip.isVisible}
function create_if_block_10(ctx) {
	let div1;
	let header;
	let span0;
	let t0_value = /*$_tooltip*/ ctx[6].regionId + "";
	let t0;
	let t1;
	let t2;
	let div0;
	let span1;
	let t3_value = /*$_tooltip*/ ctx[6].regionLabel + "";
	let t3;
	let div1_style_value;
	let if_block = /*$_tooltip*/ ctx[6].value && create_if_block_11(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			header = element("header");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			div0 = element("div");
			span1 = element("span");
			t3 = text(t3_value);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true, style: true });
			var div1_nodes = children(div1);
			header = claim_element(div1_nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			span0 = claim_element(header_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, t0_value);
			span0_nodes.forEach(detach_dev);
			t1 = claim_space(header_nodes);
			if (if_block) if_block.l(header_nodes);
			header_nodes.forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			span1 = claim_element(div0_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t3 = claim_text(span1_nodes, t3_value);
			span1_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "svelte-g8ldqp");
			add_location(span0, file, 608, 10, 14605);
			attr_dev(header, "class", "svelte-g8ldqp");
			add_location(header, file, 607, 9, 14586);
			attr_dev(span1, "class", "svelte-g8ldqp");
			add_location(span1, file, 614, 10, 14773);
			attr_dev(div0, "class", "svelte-g8ldqp");
			add_location(div0, file, 613, 9, 14757);
			attr_dev(div1, "class", "tooltip svelte-g8ldqp");
			attr_dev(div1, "style", div1_style_value = /*$_tooltip*/ ctx[6].style);
			add_location(div1, file, 603, 8, 14504);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			append_hydration_dev(div1, header);
			append_hydration_dev(header, span0);
			append_hydration_dev(span0, t0);
			append_hydration_dev(header, t1);
			if (if_block) if_block.m(header, null);
			append_hydration_dev(div1, t2);
			append_hydration_dev(div1, div0);
			append_hydration_dev(div0, span1);
			append_hydration_dev(span1, t3);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*$_tooltip*/ 64 && t0_value !== (t0_value = /*$_tooltip*/ ctx[6].regionId + "")) set_data_dev(t0, t0_value);

			if (/*$_tooltip*/ ctx[6].value) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_11(ctx);
					if_block.c();
					if_block.m(header, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*$_tooltip*/ 64 && t3_value !== (t3_value = /*$_tooltip*/ ctx[6].regionLabel + "")) set_data_dev(t3, t3_value);

			if (dirty[0] & /*$_tooltip*/ 64 && div1_style_value !== (div1_style_value = /*$_tooltip*/ ctx[6].style)) {
				attr_dev(div1, "style", div1_style_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_10.name,
		type: "if",
		source: "(603:7) {#if $_tooltip.isVisible}",
		ctx
	});

	return block;
}

// (610:10) {#if $_tooltip.value}
function create_if_block_11(ctx) {
	let span;
	let t_value = /*$_tooltip*/ ctx[6].value + "";
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-g8ldqp");
			add_location(span, file, 610, 11, 14682);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, span, anchor);
			append_hydration_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*$_tooltip*/ 64 && t_value !== (t_value = /*$_tooltip*/ ctx[6].value + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_11.name,
		type: "if",
		source: "(610:10) {#if $_tooltip.value}",
		ctx
	});

	return block;
}

// (653:4) {#if $_geoModal.isVisible}
function create_if_block_7(ctx) {
	let geofiltermodal;
	let current;
	geofiltermodal = new GeoFilterModal({ $$inline: true });
	geofiltermodal.$on("click", toggleGeoModal);
	geofiltermodal.$on("keydown", /*keyToggleGeoMenu*/ ctx[57]);

	const block = {
		c: function create() {
			create_component(geofiltermodal.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(geofiltermodal.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(geofiltermodal, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(geofiltermodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(geofiltermodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(geofiltermodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(653:4) {#if $_geoModal.isVisible}",
		ctx
	});

	return block;
}

// (664:3) {#if $_infoModal.isVisible}
function create_if_block_6(ctx) {
	let infomodal;
	let current;

	infomodal = new InfoModal({
			props: {
				api_doc_url: /*api_doc_url*/ ctx[32],
				api_type: /*api_type*/ ctx[31],
				auth_provider: /*auth_provider*/ ctx[30],
				data_date: /*data_date*/ ctx[29],
				description: /*description*/ ctx[28],
				endpoint_url: /*endpoint_url*/ ctx[27],
				is_experimental: /*is_experimental*/ ctx[26],
				is_public: /*is_public*/ ctx[25],
				query: /*query*/ ctx[24],
				region_types: /*region_types*/ ctx[23],
				source_name: /*source_name*/ ctx[22],
				source_url: /*source_url*/ ctx[21],
				url: /*url*/ ctx[18],
				year_extent: /*year_extent*/ ctx[16],
				warning: /*warning*/ ctx[17]
			},
			$$inline: true
		});

	infomodal.$on("click", toggleInfoModal);

	const block = {
		c: function create() {
			create_component(infomodal.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(infomodal.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(infomodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const infomodal_changes = {};
			if (dirty[1] & /*api_doc_url*/ 2) infomodal_changes.api_doc_url = /*api_doc_url*/ ctx[32];
			if (dirty[1] & /*api_type*/ 1) infomodal_changes.api_type = /*api_type*/ ctx[31];
			if (dirty[0] & /*auth_provider*/ 1073741824) infomodal_changes.auth_provider = /*auth_provider*/ ctx[30];
			if (dirty[0] & /*data_date*/ 536870912) infomodal_changes.data_date = /*data_date*/ ctx[29];
			if (dirty[0] & /*description*/ 268435456) infomodal_changes.description = /*description*/ ctx[28];
			if (dirty[0] & /*endpoint_url*/ 134217728) infomodal_changes.endpoint_url = /*endpoint_url*/ ctx[27];
			if (dirty[0] & /*is_experimental*/ 67108864) infomodal_changes.is_experimental = /*is_experimental*/ ctx[26];
			if (dirty[0] & /*is_public*/ 33554432) infomodal_changes.is_public = /*is_public*/ ctx[25];
			if (dirty[0] & /*query*/ 16777216) infomodal_changes.query = /*query*/ ctx[24];
			if (dirty[0] & /*region_types*/ 8388608) infomodal_changes.region_types = /*region_types*/ ctx[23];
			if (dirty[0] & /*source_name*/ 4194304) infomodal_changes.source_name = /*source_name*/ ctx[22];
			if (dirty[0] & /*source_url*/ 2097152) infomodal_changes.source_url = /*source_url*/ ctx[21];
			if (dirty[0] & /*url*/ 262144) infomodal_changes.url = /*url*/ ctx[18];
			if (dirty[0] & /*year_extent*/ 65536) infomodal_changes.year_extent = /*year_extent*/ ctx[16];
			if (dirty[0] & /*warning*/ 131072) infomodal_changes.warning = /*warning*/ ctx[17];
			infomodal.$set(infomodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(infomodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(infomodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(infomodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(664:3) {#if $_infoModal.isVisible}",
		ctx
	});

	return block;
}

// (322:4) {:else}
function create_else_block_2(ctx) {
	let div0;
	let current_block_type_index;
	let if_block0;
	let t;
	let div2;
	let div1;
	let current_block_type_index_1;
	let if_block1;
	let div1_resize_listener;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_5, create_else_block_4];
	const if_blocks = [];

	function select_block_type_2(ctx, dirty) {
		if (/*$_colorBins*/ ctx[37]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_2(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const if_block_creators_1 = [create_if_block_4, create_else_block_3];
	const if_blocks_1 = [];

	function select_block_type_3(ctx, dirty) {
		if (/*showMap*/ ctx[13]) return 0;
		return 1;
	}

	current_block_type_index_1 = select_block_type_3(ctx);
	if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);

	const block = {
		c: function create() {
			div0 = element("div");
			if_block0.c();
			t = space();
			div2 = element("div");
			div1 = element("div");
			if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block0.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if_block1.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "topbox svelte-g8ldqp");
			add_location(div0, file, 322, 5, 8078);
			attr_dev(div1, "class", "map svelte-g8ldqp");
			add_render_callback(() => /*div1_elementresize_handler*/ ctx[75].call(div1));
			add_location(div1, file, 346, 6, 8639);
			attr_dev(div2, "class", "content svelte-g8ldqp");
			add_location(div2, file, 345, 5, 8611);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);
			if_blocks[current_block_type_index].m(div0, null);
			insert_hydration_dev(target, t, anchor);
			insert_hydration_dev(target, div2, anchor);
			append_hydration_dev(div2, div1);
			if_blocks_1[current_block_type_index_1].m(div1, null);
			div1_resize_listener = add_iframe_resize_listener(div1, /*div1_elementresize_handler*/ ctx[75].bind(div1));
			current = true;

			if (!mounted) {
				dispose = listen_dev(div1, "mousemove", /*onMousemoved*/ ctx[52], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_2(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div0, null);
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_3(ctx);

			if (current_block_type_index_1 === previous_block_index_1) {
				if_blocks_1[current_block_type_index_1].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
					if_blocks_1[previous_block_index_1] = null;
				});

				check_outros();
				if_block1 = if_blocks_1[current_block_type_index_1];

				if (!if_block1) {
					if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(div1, null);
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
			if (detaching) detach_dev(div0);
			if_blocks[current_block_type_index].d();
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div2);
			if_blocks_1[current_block_type_index_1].d();
			div1_resize_listener();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_2.name,
		type: "else",
		source: "(322:4) {:else}",
		ctx
	});

	return block;
}

// (320:4) {#if $_isCurrentDataEmpty}
function create_if_block_3(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: config.noDataMessage },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(messageview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(messageview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(messageview, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(messageview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(messageview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(messageview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(320:4) {#if $_isCurrentDataEmpty}",
		ctx
	});

	return block;
}

// (342:6) {:else}
function create_else_block_4(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: config.noLegendMessage },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(messageview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(messageview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(messageview, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(messageview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(messageview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(messageview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_4.name,
		type: "else",
		source: "(342:6) {:else}",
		ctx
	});

	return block;
}

// (324:6) {#if $_colorBins}
function create_if_block_5(ctx) {
	let colorbinsdiv;
	let current;

	colorbinsdiv = new ColorBinsDiv({
			props: {
				bins: /*$_colorBins*/ ctx[37],
				geometry: { barThickness: 15, left: 30, right: 30 },
				flags: {
					withBackground: true,
					showTicksExtentOnly: true
				},
				theme: {
					backgroundColor: /*$_theme*/ ctx[38].colorWhite,
					backgroundOpacity: 0.5
				},
				ticksFormatFn: /*$_formatFn*/ ctx[33]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(colorbinsdiv.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(colorbinsdiv.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(colorbinsdiv, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const colorbinsdiv_changes = {};
			if (dirty[1] & /*$_colorBins*/ 64) colorbinsdiv_changes.bins = /*$_colorBins*/ ctx[37];

			if (dirty[1] & /*$_theme*/ 128) colorbinsdiv_changes.theme = {
				backgroundColor: /*$_theme*/ ctx[38].colorWhite,
				backgroundOpacity: 0.5
			};

			if (dirty[1] & /*$_formatFn*/ 4) colorbinsdiv_changes.ticksFormatFn = /*$_formatFn*/ ctx[33];
			colorbinsdiv.$set(colorbinsdiv_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(colorbinsdiv.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(colorbinsdiv.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(colorbinsdiv, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(324:6) {#if $_colorBins}",
		ctx
	});

	return block;
}

// (381:7) {:else}
function create_else_block_3(ctx) {
	let loadingview;
	let current;

	loadingview = new LoadingView({
			props: {
				message: fetchingMessage,
				stroke: /*$_theme*/ ctx[38].colorMain
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(loadingview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(loadingview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(loadingview, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loadingview_changes = {};
			if (dirty[1] & /*$_theme*/ 128) loadingview_changes.stroke = /*$_theme*/ ctx[38].colorMain;
			loadingview.$set(loadingview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(loadingview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(loadingview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_3.name,
		type: "else",
		source: "(381:7) {:else}",
		ctx
	});

	return block;
}

// (353:7) {#if showMap}
function create_if_block_4(ctx) {
	let svg;
	let choroplethg;
	let current;

	choroplethg = new ChoroplethG({
			props: {
				projection: /*projection*/ ctx[4],
				focusedKey: /*focusedRegionId*/ ctx[12],
				geojson: /*$_euGeojson*/ ctx[8],
				height: /*mapHeight*/ ctx[0],
				isInteractive: true,
				key: /*$_regionSettings*/ ctx[39].key,
				keyToColorFn: /*$_regionIdToColorFn*/ ctx[40],
				selectedKeys: /*$_selectedRegionIds*/ ctx[41],
				theme: {
					defaultFill: defaultGray,
					defaultStroke: 'gray',
					defaultStrokeWidth: 0.25,
					focusedStroke: /*$_theme*/ ctx[38].colorBlack,
					focusedStrokeWidth: 1.5,
					selectedStroke: /*$_theme*/ ctx[38].colorBlack,
					selectedStrokeWidth: 0.5
				},
				width: /*mapWidth*/ ctx[1]
			},
			$$inline: true
		});

	choroplethg.$on("entered", /*onEnteredArea*/ ctx[50]);
	choroplethg.$on("exited", /*onExitedArea*/ ctx[51]);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			create_component(choroplethg.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_svg_element(nodes, "svg", { height: true, width: true });
			var svg_nodes = children(svg);
			claim_component(choroplethg.$$.fragment, svg_nodes);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "height", /*mapHeight*/ ctx[0]);
			attr_dev(svg, "width", /*mapWidth*/ ctx[1]);
			add_location(svg, file, 353, 8, 8807);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, svg, anchor);
			mount_component(choroplethg, svg, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const choroplethg_changes = {};
			if (dirty[0] & /*projection*/ 16) choroplethg_changes.projection = /*projection*/ ctx[4];
			if (dirty[0] & /*focusedRegionId*/ 4096) choroplethg_changes.focusedKey = /*focusedRegionId*/ ctx[12];
			if (dirty[0] & /*$_euGeojson*/ 256) choroplethg_changes.geojson = /*$_euGeojson*/ ctx[8];
			if (dirty[0] & /*mapHeight*/ 1) choroplethg_changes.height = /*mapHeight*/ ctx[0];
			if (dirty[1] & /*$_regionSettings*/ 256) choroplethg_changes.key = /*$_regionSettings*/ ctx[39].key;
			if (dirty[1] & /*$_regionIdToColorFn*/ 512) choroplethg_changes.keyToColorFn = /*$_regionIdToColorFn*/ ctx[40];
			if (dirty[1] & /*$_selectedRegionIds*/ 1024) choroplethg_changes.selectedKeys = /*$_selectedRegionIds*/ ctx[41];

			if (dirty[1] & /*$_theme*/ 128) choroplethg_changes.theme = {
				defaultFill: defaultGray,
				defaultStroke: 'gray',
				defaultStrokeWidth: 0.25,
				focusedStroke: /*$_theme*/ ctx[38].colorBlack,
				focusedStrokeWidth: 1.5,
				selectedStroke: /*$_theme*/ ctx[38].colorBlack,
				selectedStrokeWidth: 0.5
			};

			if (dirty[0] & /*mapWidth*/ 2) choroplethg_changes.width = /*mapWidth*/ ctx[1];
			choroplethg.$set(choroplethg_changes);

			if (!current || dirty[0] & /*mapHeight*/ 1) {
				attr_dev(svg, "height", /*mapHeight*/ ctx[0]);
			}

			if (!current || dirty[0] & /*mapWidth*/ 2) {
				attr_dev(svg, "width", /*mapWidth*/ ctx[1]);
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
			if (detaching) detach_dev(svg);
			destroy_component(choroplethg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(353:7) {#if showMap}",
		ctx
	});

	return block;
}

// (400:4) {:else}
function create_else_block(ctx) {
	let div0;
	let current_block_type_index;
	let if_block;
	let t;
	let div1;
	let barchartvdiv;
	let current;
	const if_block_creators = [create_if_block_2, create_else_block_1];
	const if_blocks = [];

	function select_block_type_5(ctx, dirty) {
		if (/*$_colorBins*/ ctx[37]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_5(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	barchartvdiv = new BarchartVDiv({
			props: {
				formatFn: /*$_formatFn*/ ctx[33],
				heroKey: /*focusedAtlasId*/ ctx[2],
				isInteractive: true,
				items: /*$_regionIdValuePairs*/ ctx[7],
				keyToColor: /*$_regionIdToColor*/ ctx[42],
				keyToLabel: /*$_regionIdToBarchartLabel*/ ctx[43],
				refs: /*$_barchartRefs*/ ctx[44],
				selectedKeys: /*barchartSelectedKeys*/ ctx[10],
				shouldResetScroll: true,
				shouldScrollToHeroKey: true,
				theme: /*barchartTheme*/ ctx[48],
				title: /*barchartTitle*/ ctx[14]
			},
			$$inline: true
		});

	barchartvdiv.$on("entered", /*onEnteredBar*/ ctx[53]);
	barchartvdiv.$on("exited", /*onExitedBar*/ ctx[54]);

	const block = {
		c: function create() {
			div0 = element("div");
			if_block.c();
			t = space();
			div1 = element("div");
			create_component(barchartvdiv.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(barchartvdiv.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "topbox svelte-g8ldqp");
			add_location(div0, file, 400, 5, 9986);
			attr_dev(div1, "class", "content svelte-g8ldqp");
			add_location(div1, file, 423, 5, 10519);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);
			if_blocks[current_block_type_index].m(div0, null);
			insert_hydration_dev(target, t, anchor);
			insert_hydration_dev(target, div1, anchor);
			mount_component(barchartvdiv, div1, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_5(ctx);

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
				if_block.m(div0, null);
			}

			const barchartvdiv_changes = {};
			if (dirty[1] & /*$_formatFn*/ 4) barchartvdiv_changes.formatFn = /*$_formatFn*/ ctx[33];
			if (dirty[0] & /*focusedAtlasId*/ 4) barchartvdiv_changes.heroKey = /*focusedAtlasId*/ ctx[2];
			if (dirty[0] & /*$_regionIdValuePairs*/ 128) barchartvdiv_changes.items = /*$_regionIdValuePairs*/ ctx[7];
			if (dirty[1] & /*$_regionIdToColor*/ 2048) barchartvdiv_changes.keyToColor = /*$_regionIdToColor*/ ctx[42];
			if (dirty[1] & /*$_regionIdToBarchartLabel*/ 4096) barchartvdiv_changes.keyToLabel = /*$_regionIdToBarchartLabel*/ ctx[43];
			if (dirty[1] & /*$_barchartRefs*/ 8192) barchartvdiv_changes.refs = /*$_barchartRefs*/ ctx[44];
			if (dirty[0] & /*barchartSelectedKeys*/ 1024) barchartvdiv_changes.selectedKeys = /*barchartSelectedKeys*/ ctx[10];
			if (dirty[0] & /*barchartTitle*/ 16384) barchartvdiv_changes.title = /*barchartTitle*/ ctx[14];
			barchartvdiv.$set(barchartvdiv_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(barchartvdiv.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(barchartvdiv.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if_blocks[current_block_type_index].d();
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div1);
			destroy_component(barchartvdiv);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(400:4) {:else}",
		ctx
	});

	return block;
}

// (398:4) {#if $_isCurrentDataEmpty}
function create_if_block_1(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: config.noDataMessage },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(messageview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(messageview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(messageview, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(messageview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(messageview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(messageview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(398:4) {#if $_isCurrentDataEmpty}",
		ctx
	});

	return block;
}

// (420:6) {:else}
function create_else_block_1(ctx) {
	let messageview;
	let current;

	messageview = new MessageView({
			props: { text: config.noLegendMessage },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(messageview.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(messageview.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(messageview, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(messageview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(messageview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(messageview, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(420:6) {:else}",
		ctx
	});

	return block;
}

// (402:6) {#if $_colorBins}
function create_if_block_2(ctx) {
	let colorbinsdiv;
	let current;

	colorbinsdiv = new ColorBinsDiv({
			props: {
				bins: /*$_colorBins*/ ctx[37],
				geometry: { barThickness: 15, left: 30, right: 30 },
				flags: {
					withBackground: true,
					showTicksExtentOnly: true
				},
				theme: {
					backgroundColor: /*$_theme*/ ctx[38].colorWhite,
					backgroundOpacity: 0.5
				},
				ticksFormatFn: /*$_formatFn*/ ctx[33]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(colorbinsdiv.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(colorbinsdiv.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(colorbinsdiv, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const colorbinsdiv_changes = {};
			if (dirty[1] & /*$_colorBins*/ 64) colorbinsdiv_changes.bins = /*$_colorBins*/ ctx[37];

			if (dirty[1] & /*$_theme*/ 128) colorbinsdiv_changes.theme = {
				backgroundColor: /*$_theme*/ ctx[38].colorWhite,
				backgroundOpacity: 0.5
			};

			if (dirty[1] & /*$_formatFn*/ 4) colorbinsdiv_changes.ticksFormatFn = /*$_formatFn*/ ctx[33];
			colorbinsdiv.$set(colorbinsdiv_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(colorbinsdiv.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(colorbinsdiv.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(colorbinsdiv, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(402:6) {#if $_colorBins}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div1;
	let header;
	let t;
	let div0;
	let current_block_type_index;
	let if_block;
	let div0_class_value;
	let div1_class_value;
	let current;

	header = new Header({
			props: {
				subtitle: /*subtitle*/ ctx[20],
				title: /*title*/ ctx[19]
			},
			$$inline: true
		});

	header.$on("click", toggleInfoModal);
	const if_block_creators = [create_if_block, create_else_block_5];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$_isSmallScreen*/ ctx[9]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			create_component(header.$$.fragment);
			t = space();
			div0 = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			claim_component(header.$$.fragment, div1_nodes);
			t = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", div0_class_value = "viewport " + /*$_viewsClasses*/ ctx[36] + " svelte-g8ldqp");
			toggle_class(div0, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			add_location(div0, file, 305, 1, 7764);
			attr_dev(div1, "class", div1_class_value = "time_region_value_IdYear " + /*$_screenClasses*/ ctx[34] + " svelte-g8ldqp");
			add_location(div1, file, 298, 0, 7640);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			mount_component(header, div1, null);
			append_hydration_dev(div1, t);
			append_hydration_dev(div1, div0);
			if_blocks[current_block_type_index].m(div0, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const header_changes = {};
			if (dirty[0] & /*subtitle*/ 1048576) header_changes.subtitle = /*subtitle*/ ctx[20];
			if (dirty[0] & /*title*/ 524288) header_changes.title = /*title*/ ctx[19];
			header.$set(header_changes);
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
				if_block.m(div0, null);
			}

			if (!current || dirty[1] & /*$_viewsClasses*/ 32 && div0_class_value !== (div0_class_value = "viewport " + /*$_viewsClasses*/ ctx[36] + " svelte-g8ldqp")) {
				attr_dev(div0, "class", div0_class_value);
			}

			if (!current || dirty[1] & /*$_viewsClasses, $_isCurrentDataEmpty*/ 48) {
				toggle_class(div0, "noData", /*$_isCurrentDataEmpty*/ ctx[35]);
			}

			if (!current || dirty[1] & /*$_screenClasses*/ 8 && div1_class_value !== (div1_class_value = "time_region_value_IdYear " + /*$_screenClasses*/ ctx[34] + " svelte-g8ldqp")) {
				attr_dev(div1, "class", div1_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(header.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_component(header);
			if_blocks[current_block_type_index].d();
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

const defaultGray = '#f3f3f3';
const fetchingMessage = 'Fetching boundaries...';
const legendBarThickness = 40;
const markerRadius = 4;
const labelsFontSize = 13;

function instance$1($$self, $$props, $$invalidate) {
	let api_doc_url;
	let api_type;
	let auth_provider;
	let data_date;
	let description;
	let endpoint_url;
	let is_experimental;
	let is_public;
	let query;
	let region_types;
	let schema;
	let source_name;
	let source_url;
	let subtitle;
	let title;
	let url;
	let warning;
	let year_extent;
	let legendHeight;
	let choroplethSafety;
	let choroplethInnerHeight;
	let choroplethInnerWidth;
	let labelUnit;
	let barchartTitle;
	let euProjection;
	let filteredProjection;
	let projection;
	let showMap;
	let focusedAtlasId;
	let focusedRegionId;
	let POIsLayout;
	let barchartSelectedKeys;
	let $_doFilterRegions;
	let $_tooltip;
	let $_formatFn;
	let $_regionIdToValue;
	let $_selectedRegionAtlasIds;
	let $_getAtlasIdFromRegionId;
	let $_regionIdValuePairs;
	let $_POIs;
	let $_navFlags;
	let $_getRegionIdFromAtlasId;
	let $_isTopoFetching;
	let $_filteredGeojson;
	let $_euGeojson;
	let $_isSmallScreen;
	let $_lookup;
	let $_screenClasses;
	let $_isCurrentDataEmpty;
	let $_viewsClasses;
	let $_colorBins;
	let $_theme;
	let $_regionSettings;
	let $_regionIdToColorFn;
	let $_selectedRegionIds;
	let $_regionIdToColor;
	let $_regionIdToBarchartLabel;
	let $_barchartRefs;
	let $_geoModal;
	let $_isRegionsSelectionDirty;
	let $_infoModal;
	validate_store(_doFilterRegions, '_doFilterRegions');
	component_subscribe($$self, _doFilterRegions, $$value => $$invalidate(5, $_doFilterRegions = $$value));
	validate_store(_formatFn, '_formatFn');
	component_subscribe($$self, _formatFn, $$value => $$invalidate(33, $_formatFn = $$value));
	validate_store(_regionIdToValue, '_regionIdToValue');
	component_subscribe($$self, _regionIdToValue, $$value => $$invalidate(77, $_regionIdToValue = $$value));
	validate_store(_selectedRegionAtlasIds, '_selectedRegionAtlasIds');
	component_subscribe($$self, _selectedRegionAtlasIds, $$value => $$invalidate(68, $_selectedRegionAtlasIds = $$value));
	validate_store(_getAtlasIdFromRegionId, '_getAtlasIdFromRegionId');
	component_subscribe($$self, _getAtlasIdFromRegionId, $$value => $$invalidate(78, $_getAtlasIdFromRegionId = $$value));
	validate_store(_regionIdValuePairs, '_regionIdValuePairs');
	component_subscribe($$self, _regionIdValuePairs, $$value => $$invalidate(7, $_regionIdValuePairs = $$value));
	validate_store(_POIs, '_POIs');
	component_subscribe($$self, _POIs, $$value => $$invalidate(69, $_POIs = $$value));
	validate_store(_navFlags, '_navFlags');
	component_subscribe($$self, _navFlags, $$value => $$invalidate(70, $_navFlags = $$value));
	validate_store(_getRegionIdFromAtlasId, '_getRegionIdFromAtlasId');
	component_subscribe($$self, _getRegionIdFromAtlasId, $$value => $$invalidate(71, $_getRegionIdFromAtlasId = $$value));
	validate_store(_isTopoFetching, '_isTopoFetching');
	component_subscribe($$self, _isTopoFetching, $$value => $$invalidate(72, $_isTopoFetching = $$value));
	validate_store(_filteredGeojson, '_filteredGeojson');
	component_subscribe($$self, _filteredGeojson, $$value => $$invalidate(73, $_filteredGeojson = $$value));
	validate_store(_euGeojson, '_euGeojson');
	component_subscribe($$self, _euGeojson, $$value => $$invalidate(8, $_euGeojson = $$value));
	validate_store(_isSmallScreen, '_isSmallScreen');
	component_subscribe($$self, _isSmallScreen, $$value => $$invalidate(9, $_isSmallScreen = $$value));
	validate_store(_lookup, '_lookup');
	component_subscribe($$self, _lookup, $$value => $$invalidate(74, $_lookup = $$value));
	validate_store(_screenClasses, '_screenClasses');
	component_subscribe($$self, _screenClasses, $$value => $$invalidate(34, $_screenClasses = $$value));
	validate_store(_isCurrentDataEmpty, '_isCurrentDataEmpty');
	component_subscribe($$self, _isCurrentDataEmpty, $$value => $$invalidate(35, $_isCurrentDataEmpty = $$value));
	validate_store(_viewsClasses, '_viewsClasses');
	component_subscribe($$self, _viewsClasses, $$value => $$invalidate(36, $_viewsClasses = $$value));
	validate_store(_colorBins, '_colorBins');
	component_subscribe($$self, _colorBins, $$value => $$invalidate(37, $_colorBins = $$value));
	validate_store(_theme, '_theme');
	component_subscribe($$self, _theme, $$value => $$invalidate(38, $_theme = $$value));
	validate_store(_regionSettings, '_regionSettings');
	component_subscribe($$self, _regionSettings, $$value => $$invalidate(39, $_regionSettings = $$value));
	validate_store(_regionIdToColorFn, '_regionIdToColorFn');
	component_subscribe($$self, _regionIdToColorFn, $$value => $$invalidate(40, $_regionIdToColorFn = $$value));
	validate_store(_selectedRegionIds, '_selectedRegionIds');
	component_subscribe($$self, _selectedRegionIds, $$value => $$invalidate(41, $_selectedRegionIds = $$value));
	validate_store(_regionIdToColor, '_regionIdToColor');
	component_subscribe($$self, _regionIdToColor, $$value => $$invalidate(42, $_regionIdToColor = $$value));
	validate_store(_regionIdToBarchartLabel, '_regionIdToBarchartLabel');
	component_subscribe($$self, _regionIdToBarchartLabel, $$value => $$invalidate(43, $_regionIdToBarchartLabel = $$value));
	validate_store(_barchartRefs, '_barchartRefs');
	component_subscribe($$self, _barchartRefs, $$value => $$invalidate(44, $_barchartRefs = $$value));
	validate_store(_geoModal, '_geoModal');
	component_subscribe($$self, _geoModal, $$value => $$invalidate(45, $_geoModal = $$value));
	validate_store(_isRegionsSelectionDirty, '_isRegionsSelectionDirty');
	component_subscribe($$self, _isRegionsSelectionDirty, $$value => $$invalidate(46, $_isRegionsSelectionDirty = $$value));
	validate_store(_infoModal, '_infoModal');
	component_subscribe($$self, _infoModal, $$value => $$invalidate(47, $_infoModal = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('U5Byearu5D', slots, []);
	const labelPadding = labelsFontSize / 2;
	const labelDx = markerRadius + labelPadding;
	let { data = null } = $$props;
	let { id = null } = $$props;
	let { types = null } = $$props;
	let { year = null } = $$props;

	/* init */
	onMount(() => {
		setRoute('IdYear');
	});

	/* local vars */
	// bound
	let mapHeight;

	let mapWidth;

	const barchartTheme = {
		itemBackgroundColorHero: 'rgb(211, 238, 253)',
		itemBackgroundColorSelected: 'antiquewhite',
		titleFontSize: '1.2rem'
	};

	/* map tooltip */
	const _tooltip = writable({ isVisible: false });

	validate_store(_tooltip, '_tooltip');
	component_subscribe($$self, _tooltip, value => $$invalidate(6, $_tooltip = value));

	const makeTooltipStyle = event => {
		const { layerX: X, layerY: Y } = event;

		const x = X < mapWidth / 2
		? { key: 'left', value: X + 20 }
		: { key: 'right', value: mapWidth - X + 10 };

		const y = Y < mapHeight / 2
		? { key: 'top', value: Y + 20 }
		: { key: 'bottom', value: mapHeight - Y + 10 };

		return makeStyle({
			[x.key]: toPx(x.value),
			[y.key]: toPx(y.value),
			visibility: 'visible'
		});
	};

	const onEnteredArea = event => {
		const { detail: regionId } = event;

		// FIXME use `atlasId` in topojson
		const atlasId = $_getAtlasIdFromRegionId(regionId);

		const hasValue = has($_regionIdToValue, atlasId);

		const shouldShowValue = $_doFilterRegions
		? isIn($_selectedRegionAtlasIds, atlasId)
		: true;

		const rawValue = $_regionIdToValue[atlasId];
		const regionLabel = regionIdToName[atlasId];

		const value = shouldShowValue && hasValue
		? $_formatFn(rawValue) + (labelUnit ? ` ${labelUnit}` : '')
		: undefined;

		_tooltip.update(mergeObj({
			atlasId,
			isVisible: true,
			regionId,
			regionLabel,
			style: makeTooltipStyle(event),
			value
		}));
	};

	const onExitedArea = () => {
		_tooltip.update(mergeObj({
			isVisible: false,
			style: 'visibility: hidden'
		}));
	};

	const onMousemoved = event => {
		$_tooltip.isVisible && _tooltip.update(mergeObj({ style: makeTooltipStyle(event) }));
	};

	/* barchart hovering */
	const onEnteredBar = ({ detail: { id: focusedBarAtlasId } }) => {
		$$invalidate(2, focusedAtlasId = focusedBarAtlasId);
	};

	const onExitedBar = () => {
		$$invalidate(2, focusedAtlasId = null);
	};

	/* settings handlers */
	const setLevel = ({ detail: level }) => setCurrentLevel(level);

	const toggledFiltering = ({ detail }) => {
		set_store_value(_doFilterRegions, $_doFilterRegions = detail === 'Filter', $_doFilterRegions);
	};

	const keyToggleGeoMenu = event => {
		if (['Enter', ' '].includes(event.key)) {
			event.preventDefault();
			toggleGeoModal();
		}
	};

	const writable_props = ['data', 'id', 'types', 'year'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U5Byearu5D> was created with unknown prop '${key}'`);
	});

	function div1_elementresize_handler() {
		mapHeight = this.clientHeight;
		mapWidth = this.clientWidth;
		$$invalidate(0, mapHeight);
		$$invalidate(1, mapWidth);
	}

	function div0_elementresize_handler() {
		mapHeight = this.clientHeight;
		mapWidth = this.clientWidth;
		$$invalidate(0, mapHeight);
		$$invalidate(1, mapWidth);
	}

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(58, data = $$props.data);
		if ('id' in $$props) $$invalidate(59, id = $$props.id);
		if ('types' in $$props) $$invalidate(60, types = $$props.types);
		if ('year' in $$props) $$invalidate(61, year = $$props.year);
	};

	$$self.$capture_state = () => ({
		BarchartVDiv,
		ChoroplethG,
		defaultGeometry,
		makeStyle,
		toPx,
		ColorBinsDiv,
		ColorBinsG,
		LoadingView,
		MessageView,
		areAllTruthy,
		mergeObj,
		projectionFn,
		_,
		onMount,
		writable,
		GeoFilterModal,
		Header,
		InfoModal,
		InfoView,
		SettingsRow,
		SettingsView,
		_lookup,
		_euGeojson,
		_filteredGeojson,
		_getAtlasIdFromRegionId,
		_getRegionIdFromAtlasId,
		_isTopoFetching,
		_formatFn,
		_indicator,
		_selectedRegionAtlasIds,
		_selectedRegionIds,
		_isCurrentDataEmpty,
		_barchartRefs,
		_regionIdToBarchartLabel,
		_regionIdToColor,
		_regionIdToColorFn,
		_regionIdToValue,
		_regionIdValuePairs,
		_isSmallScreen,
		_screenClasses,
		_colorBins,
		_geoModal,
		_infoModal,
		hideGeoModal,
		hideInfoModal,
		toggleGeoModal,
		toggleInfoModal,
		_navFlags,
		_viewsClasses,
		setRoute,
		showView,
		_POIs,
		_regionSettings,
		_doFilterRegions,
		_isRegionsSelectionDirty,
		setCurrentLevel,
		setSelectedYear,
		_theme,
		regionIdToName,
		config,
		defaultGray,
		fetchingMessage,
		legendBarThickness,
		markerRadius,
		labelsFontSize,
		labelPadding,
		labelDx,
		data,
		id,
		types,
		year,
		mapHeight,
		mapWidth,
		barchartTheme,
		_tooltip,
		makeTooltipStyle,
		onEnteredArea,
		onExitedArea,
		onMousemoved,
		onEnteredBar,
		onExitedBar,
		setLevel,
		toggledFiltering,
		keyToggleGeoMenu,
		focusedAtlasId,
		labelUnit,
		barchartSelectedKeys,
		choroplethSafety,
		projection,
		POIsLayout,
		focusedRegionId,
		showMap,
		euProjection,
		filteredProjection,
		choroplethInnerHeight,
		choroplethInnerWidth,
		schema,
		barchartTitle,
		legendHeight,
		year_extent,
		warning,
		url,
		title,
		subtitle,
		source_url,
		source_name,
		region_types,
		query,
		is_public,
		is_experimental,
		endpoint_url,
		description,
		data_date,
		auth_provider,
		api_type,
		api_doc_url,
		$_doFilterRegions,
		$_tooltip,
		$_formatFn,
		$_regionIdToValue,
		$_selectedRegionAtlasIds,
		$_getAtlasIdFromRegionId,
		$_regionIdValuePairs,
		$_POIs,
		$_navFlags,
		$_getRegionIdFromAtlasId,
		$_isTopoFetching,
		$_filteredGeojson,
		$_euGeojson,
		$_isSmallScreen,
		$_lookup,
		$_screenClasses,
		$_isCurrentDataEmpty,
		$_viewsClasses,
		$_colorBins,
		$_theme,
		$_regionSettings,
		$_regionIdToColorFn,
		$_selectedRegionIds,
		$_regionIdToColor,
		$_regionIdToBarchartLabel,
		$_barchartRefs,
		$_geoModal,
		$_isRegionsSelectionDirty,
		$_infoModal
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(58, data = $$props.data);
		if ('id' in $$props) $$invalidate(59, id = $$props.id);
		if ('types' in $$props) $$invalidate(60, types = $$props.types);
		if ('year' in $$props) $$invalidate(61, year = $$props.year);
		if ('mapHeight' in $$props) $$invalidate(0, mapHeight = $$props.mapHeight);
		if ('mapWidth' in $$props) $$invalidate(1, mapWidth = $$props.mapWidth);
		if ('focusedAtlasId' in $$props) $$invalidate(2, focusedAtlasId = $$props.focusedAtlasId);
		if ('labelUnit' in $$props) $$invalidate(62, labelUnit = $$props.labelUnit);
		if ('barchartSelectedKeys' in $$props) $$invalidate(10, barchartSelectedKeys = $$props.barchartSelectedKeys);
		if ('choroplethSafety' in $$props) $$invalidate(3, choroplethSafety = $$props.choroplethSafety);
		if ('projection' in $$props) $$invalidate(4, projection = $$props.projection);
		if ('POIsLayout' in $$props) $$invalidate(11, POIsLayout = $$props.POIsLayout);
		if ('focusedRegionId' in $$props) $$invalidate(12, focusedRegionId = $$props.focusedRegionId);
		if ('showMap' in $$props) $$invalidate(13, showMap = $$props.showMap);
		if ('euProjection' in $$props) $$invalidate(63, euProjection = $$props.euProjection);
		if ('filteredProjection' in $$props) $$invalidate(64, filteredProjection = $$props.filteredProjection);
		if ('choroplethInnerHeight' in $$props) $$invalidate(65, choroplethInnerHeight = $$props.choroplethInnerHeight);
		if ('choroplethInnerWidth' in $$props) $$invalidate(66, choroplethInnerWidth = $$props.choroplethInnerWidth);
		if ('schema' in $$props) $$invalidate(67, schema = $$props.schema);
		if ('barchartTitle' in $$props) $$invalidate(14, barchartTitle = $$props.barchartTitle);
		if ('legendHeight' in $$props) $$invalidate(15, legendHeight = $$props.legendHeight);
		if ('year_extent' in $$props) $$invalidate(16, year_extent = $$props.year_extent);
		if ('warning' in $$props) $$invalidate(17, warning = $$props.warning);
		if ('url' in $$props) $$invalidate(18, url = $$props.url);
		if ('title' in $$props) $$invalidate(19, title = $$props.title);
		if ('subtitle' in $$props) $$invalidate(20, subtitle = $$props.subtitle);
		if ('source_url' in $$props) $$invalidate(21, source_url = $$props.source_url);
		if ('source_name' in $$props) $$invalidate(22, source_name = $$props.source_name);
		if ('region_types' in $$props) $$invalidate(23, region_types = $$props.region_types);
		if ('query' in $$props) $$invalidate(24, query = $$props.query);
		if ('is_public' in $$props) $$invalidate(25, is_public = $$props.is_public);
		if ('is_experimental' in $$props) $$invalidate(26, is_experimental = $$props.is_experimental);
		if ('endpoint_url' in $$props) $$invalidate(27, endpoint_url = $$props.endpoint_url);
		if ('description' in $$props) $$invalidate(28, description = $$props.description);
		if ('data_date' in $$props) $$invalidate(29, data_date = $$props.data_date);
		if ('auth_provider' in $$props) $$invalidate(30, auth_provider = $$props.auth_provider);
		if ('api_type' in $$props) $$invalidate(31, api_type = $$props.api_type);
		if ('api_doc_url' in $$props) $$invalidate(32, api_doc_url = $$props.api_doc_url);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*$_isSmallScreen*/ 512) {
			/* reactive vars */
			// navigation
			$_isSmallScreen && hideGeoModal();
		}

		if ($$self.$$.dirty[0] & /*$_isSmallScreen*/ 512) {
			$_isSmallScreen && hideInfoModal();
		}

		if ($$self.$$.dirty[1] & /*id, year*/ 1342177280) {
			id && year && hideInfoModal();
		}

		if ($$self.$$.dirty[1] & /*id*/ 268435456) {
			id && showView('map');
		}

		if ($$self.$$.dirty[1] & /*id, data*/ 402653184) {
			id && data && _indicator.set({ data, id });
		}

		if ($$self.$$.dirty[1] & /*year*/ 1073741824) {
			setSelectedYear(year);
		}

		if ($$self.$$.dirty[1] & /*id*/ 268435456 | $$self.$$.dirty[2] & /*$_lookup*/ 4096) {
			$$invalidate(32, { api_doc_url, api_type, auth_provider, data_date, description, endpoint_url, is_experimental, is_public, query, region_types, schema, source_name, source_url, subtitle, title, url, warning, year_extent } = $_lookup[id] || {}, api_doc_url, (($$invalidate(31, api_type), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(30, auth_provider), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(29, data_date), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(28, description), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(27, endpoint_url), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(26, is_experimental), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(25, is_public), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(24, query), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(23, region_types), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(67, schema), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(22, source_name), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(21, source_url), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(20, subtitle), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(19, title), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(18, url), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(17, warning), $$invalidate(74, $_lookup)), $$invalidate(59, id)), (($$invalidate(16, year_extent), $$invalidate(74, $_lookup)), $$invalidate(59, id)));
		}

		if ($$self.$$.dirty[0] & /*mapHeight*/ 1) {
			// layout
			$$invalidate(15, legendHeight = mapHeight / 3);
		}

		if ($$self.$$.dirty[0] & /*$_isSmallScreen*/ 512) {
			$$invalidate(3, choroplethSafety = $_isSmallScreen
			? defaultGeometry
			: {
					...defaultGeometry,
					left: legendBarThickness * 2
				});
		}

		if ($$self.$$.dirty[0] & /*mapHeight, choroplethSafety*/ 9) {
			$$invalidate(65, choroplethInnerHeight = mapHeight - choroplethSafety.top - choroplethSafety.bottom);
		}

		if ($$self.$$.dirty[0] & /*mapWidth, choroplethSafety*/ 10) {
			$$invalidate(66, choroplethInnerWidth = mapWidth - choroplethSafety.left - choroplethSafety.right);
		}

		if ($$self.$$.dirty[1] & /*types*/ 536870912 | $$self.$$.dirty[2] & /*schema*/ 32) {
			// labels
			// TODO move to stores/indicator.js
			$$invalidate(62, labelUnit = schema.value.unit_string || schema.value.type && has(types, schema.value.type) && has(types[schema.value.type], 'unit_string') && types[schema.value.type].unit_string);
		}

		if ($$self.$$.dirty[2] & /*schema, labelUnit*/ 33) {
			// TODO move to stores/indicatorYear.js
			$$invalidate(14, barchartTitle = schema.value.label + (labelUnit ? ` [${labelUnit}]` : ''));
		}

		if ($$self.$$.dirty[0] & /*$_euGeojson*/ 256 | $$self.$$.dirty[2] & /*choroplethInnerWidth, choroplethInnerHeight*/ 24) {
			// map
			$$invalidate(63, euProjection = $_euGeojson && projectionFn().fitSize([choroplethInnerWidth, choroplethInnerHeight], $_euGeojson));
		}

		if ($$self.$$.dirty[2] & /*$_filteredGeojson, choroplethInnerWidth, choroplethInnerHeight*/ 2072) {
			$$invalidate(64, filteredProjection = $_filteredGeojson && projectionFn().fitSize([choroplethInnerWidth, choroplethInnerHeight], $_filteredGeojson));
		}

		if ($$self.$$.dirty[0] & /*$_doFilterRegions*/ 32 | $$self.$$.dirty[2] & /*filteredProjection, euProjection*/ 6) {
			$$invalidate(4, projection = $_doFilterRegions ? filteredProjection : euProjection);
		}

		if ($$self.$$.dirty[0] & /*mapHeight, mapWidth*/ 3 | $$self.$$.dirty[2] & /*$_isTopoFetching*/ 1024) {
			// flags
			$$invalidate(13, showMap = !$_isTopoFetching && areAllTruthy([mapHeight, mapWidth]));
		}

		if ($$self.$$.dirty[0] & /*$_tooltip*/ 64) {
			// focus
			$$invalidate(2, focusedAtlasId = $_tooltip.isVisible ? $_tooltip.atlasId : undefined);
		}

		if ($$self.$$.dirty[0] & /*focusedAtlasId*/ 4 | $$self.$$.dirty[2] & /*$_getRegionIdFromAtlasId*/ 512) {
			$$invalidate(12, focusedRegionId = $_getRegionIdFromAtlasId(focusedAtlasId));
		}

		if ($$self.$$.dirty[0] & /*projection, choroplethSafety, mapWidth*/ 26 | $$self.$$.dirty[2] & /*$_navFlags, $_POIs*/ 384) {
			// POIs
			$$invalidate(11, POIsLayout = $_navFlags.showPOIs && projection && map($_POIs, obj => {
				const [x, y] = projection([obj.lng, obj.lat]);
				const X = x + choroplethSafety.left;
				const length = obj.name.length * labelsFontSize * 0.6;

				const isLeft = obj.isLeft && X - labelDx - length < choroplethSafety.left
				? false
				: X + labelDx + length > mapWidth - choroplethSafety.right
					? true
					: obj.isLeft;

				const dx = isLeft ? -labelDx : labelDx;

				const dy = obj.isBottom
				? 2 * markerRadius
				: obj.isTop ? -2 * markerRadius : 0;

				return {
					...obj,
					dx,
					dy,
					isLeft,
					X,
					Y: y + choroplethSafety.top
				};
			}));
		}

		if ($$self.$$.dirty[0] & /*$_regionIdValuePairs*/ 128 | $$self.$$.dirty[2] & /*$_selectedRegionAtlasIds*/ 64) {
			// barchart
			$$invalidate(10, barchartSelectedKeys = $_selectedRegionAtlasIds.length === $_regionIdValuePairs.length
			? []
			: $_selectedRegionAtlasIds);
		}
	};

	return [
		mapHeight,
		mapWidth,
		focusedAtlasId,
		choroplethSafety,
		projection,
		$_doFilterRegions,
		$_tooltip,
		$_regionIdValuePairs,
		$_euGeojson,
		$_isSmallScreen,
		barchartSelectedKeys,
		POIsLayout,
		focusedRegionId,
		showMap,
		barchartTitle,
		legendHeight,
		year_extent,
		warning,
		url,
		title,
		subtitle,
		source_url,
		source_name,
		region_types,
		query,
		is_public,
		is_experimental,
		endpoint_url,
		description,
		data_date,
		auth_provider,
		api_type,
		api_doc_url,
		$_formatFn,
		$_screenClasses,
		$_isCurrentDataEmpty,
		$_viewsClasses,
		$_colorBins,
		$_theme,
		$_regionSettings,
		$_regionIdToColorFn,
		$_selectedRegionIds,
		$_regionIdToColor,
		$_regionIdToBarchartLabel,
		$_barchartRefs,
		$_geoModal,
		$_isRegionsSelectionDirty,
		$_infoModal,
		barchartTheme,
		_tooltip,
		onEnteredArea,
		onExitedArea,
		onMousemoved,
		onEnteredBar,
		onExitedBar,
		setLevel,
		toggledFiltering,
		keyToggleGeoMenu,
		data,
		id,
		types,
		year,
		labelUnit,
		euProjection,
		filteredProjection,
		choroplethInnerHeight,
		choroplethInnerWidth,
		schema,
		$_selectedRegionAtlasIds,
		$_POIs,
		$_navFlags,
		$_getRegionIdFromAtlasId,
		$_isTopoFetching,
		$_filteredGeojson,
		$_lookup,
		div1_elementresize_handler,
		div0_elementresize_handler
	];
}

class U5Byearu5D$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { data: 58, id: 59, types: 60, year: 61 }, null, [-1, -1, -1]);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Byearu5D",
			options,
			id: create_fragment$1.name
		});
	}

	get data() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get types() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set types(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get year() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set year(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var IdYear = U5Byearu5D$1;

/* src/routes/compounds/time_region_value/[id]/[year].svelte generated by Svelte v3.59.2 */

function create_fragment(ctx) {
	let idyear;
	let current;

	idyear = new IdYear({
			props: {
				data: /*data*/ ctx[0],
				id: /*id*/ ctx[1],
				types,
				year: /*year*/ ctx[2]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(idyear.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(idyear.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(idyear, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const idyear_changes = {};
			if (dirty & /*data*/ 1) idyear_changes.data = /*data*/ ctx[0];
			if (dirty & /*id*/ 2) idyear_changes.id = /*id*/ ctx[1];
			if (dirty & /*year*/ 4) idyear_changes.year = /*year*/ ctx[2];
			idyear.$set(idyear_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(idyear.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(idyear.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(idyear, detaching);
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

function preload({ params: { id, year } }) {
	return this.fetch(lookup[id].url).then(r => r.text()).then(parseCSV(id)).then(data => ({ data, id, year }));
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('U5Byearu5D', slots, []);
	let { data } = $$props;
	let { id } = $$props;
	let { year } = $$props;

	$$self.$$.on_mount.push(function () {
		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
			console.warn("<U5Byearu5D> was created without expected prop 'data'");
		}

		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
			console.warn("<U5Byearu5D> was created without expected prop 'id'");
		}

		if (year === undefined && !('year' in $$props || $$self.$$.bound[$$self.$$.props['year']])) {
			console.warn("<U5Byearu5D> was created without expected prop 'year'");
		}
	});

	const writable_props = ['data', 'id', 'year'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U5Byearu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('year' in $$props) $$invalidate(2, year = $$props.year);
	};

	$$self.$capture_state = () => ({
		parseCSV,
		lookup,
		preload,
		IdYear,
		types,
		data,
		id,
		year
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('year' in $$props) $$invalidate(2, year = $$props.year);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [data, id, year];
}

class U5Byearu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { data: 0, id: 1, year: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Byearu5D",
			options,
			id: create_fragment.name
		});
	}

	get data() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get year() {
		throw new Error("<U5Byearu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set year(value) {
		throw new Error("<U5Byearu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { U5Byearu5D as default, preload };
