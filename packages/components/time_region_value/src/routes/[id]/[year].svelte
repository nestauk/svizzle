<script>
	/* ext deps */

	// utils

	import * as _ from 'lamb';
	import {extent} from 'd3-array';
	import {geoEqualEarth as projectionFn} from 'd3-geo';
	import {writable} from 'svelte/store';
	import {makeStyle, makeStyleVars, toPx} from '@svizzle/dom';
	import {
		applyFnMap,
		getValue,
		keyValueArrayAverage,
		keyValueArrayToObject,
		mergeObj,
	} from '@svizzle/utils';

	// components

	import BarchartVDiv from '@svizzle/barchart/src/BarchartVDiv.svelte';
	import ChoroplethG from '@svizzle/choropleth/src/ChoroplethG.svelte';
	import {topoToGeo, defaultGeometry} from '@svizzle/choropleth/src/utils';
	import ColorBinsG from '@svizzle/legend/src/ColorBinsG.svelte';
	import Switch from '@svizzle/ui/src/Switch.svelte';
	import Icon from '@svizzle/ui/src/icons/Icon.svelte';
	import ChevronDown from '@svizzle/ui/src/icons/feather/ChevronDown.svelte';
	import ChevronUp from '@svizzle/ui/src/icons/feather/ChevronUp.svelte';
	import Globe from '@svizzle/ui/src/icons/feather/Globe.svelte';
	import Info from '@svizzle/ui/src/icons/feather/Info.svelte';

	/* local components */

	import GeoFilterModal from 'components/GeoFilterModal.svelte';
	import InfoModal from 'components/InfoModal/InfoModal.svelte';

	/* local stores */

	import {
		currentSchemeIndexStore,
		makeColorBinsStore,
		makeColorScaleStore,
	} from 'stores/colorScale';
	import {resetSafetyStore} from 'stores/layout';
	import {
		doFilterRegionsStore,
		geoModalStore,
		hideInfoModal,
		infoModalStore,
		toggleGeoModal,
		toggleInfoModal,
	} from 'stores/modals';
	import {
		areThereUnselectedNUTS1Regions,
		nutsSelectionStore,
		preselectedNUTS2IdsStore,
		selectedNUT2IdsStore,
	} from 'stores/regionSelection';
	import {availableYearsStore, selectedYearStore} from 'stores/selection';

	/* utils  */

	import {getNutsId} from 'utils/domain';
	import {
		makeGetIndicatorFormatOf,
		makeGetRefFormatOf,
	} from 'utils/format';
	import {makeValueAccessor} from 'utils/generic';
	import defaultTheme from 'shared/theme';

	/* data */

	import yearlyKeyToLabel from 'data/NUTS2_UK_labels';
	// TODO
	// import yearlyKeyToLabel from '@svizzle/atlas/NUTS2_UK_labels';

	import majorCities from 'data/majorCities';
	import topos from 'data/topojson';

	/* consts */

	const defaultGray = '#f3f3f3';
	const markerRadius = 4;
	const labelsFontSize = 13;
	const labelPadding = labelsFontSize / 2;
	const labelDx = markerRadius + labelPadding;
	const legendBarThickness = 40;
	const topojsonId = 'NUTS'; // TODO pass this via data when we'll have LEPs

	/* props */

	// bound
	export let height;
	export let width;

	// rest
	export let data;
	export let id;
	export let lookupStore;
	export let types;
	export let year;

	/* local vars / init */

	let selectedKeys = [];

	resetSafetyStore();

	/* reactive vars */

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;

	$: style = makeStyleVars(theme);
	$: makeColorScale = $makeColorScaleStore;
	$: makeColorBins = $makeColorBinsStore;
	$: legendHeight = height / 3;
	$: choroplethSafety = {...defaultGeometry, left: legendBarThickness * 2};
	$: id && year && hideInfoModal();
	$: $selectedYearStore = Number(year);
	$: getIndicatorFormat = makeGetIndicatorFormatOf(id);
	$: formatFn = getIndicatorFormat($lookupStore);
	$: getRefFormatFn = makeGetRefFormatOf(id);
	$: refFormatFn = getRefFormatFn($lookupStore);
	$: getIndicatorValue = makeValueAccessor(id);
	// $: data && lookupStore.update(_.setPath(`${id}.data`, data));
	$: ({
		api_doc_url,
		api_type,
		auth_provider,
		availableYears,
		data_date,
		description,
		endpoint_url,
		is_public,
		query,
		region,
		schema,
		source_name,
		source_url,
		subtitle,
		title,
		url,
		warning,
		year_extent,
	} = $lookupStore[id] || {});

	$: labelUnit =
		schema.value.unit_string ||
		schema.value.type &&
		_.has(types, schema.value.type) &&
		_.has(types[schema.value.type], 'unit_string') &&
		types[schema.value.type].unit_string;
	$: barchartTitle = schema.value.label + (labelUnit ? ` [${labelUnit}]` : '');

	// $: indicatorData = $lookupStore[id].data;
	$: yearData = data && data.filter(obj => obj.year === year);
	$: $availableYearsStore = availableYears;
	$: makeKeyToValue = _.pipe([
		_.indexBy(getNutsId),
		_.mapValuesWith(getIndicatorValue)
	]);
	$: keyToValue = yearData && makeKeyToValue(yearData);

	$: makeItems = _.pipe([
		_.mapWith(applyFnMap({
			key: getNutsId,
			value: getIndicatorValue
		})),
		_.sortWith([_.sorterDesc(getValue)])
	]);
	$: items = yearData && makeItems(yearData);
	$: filteredItems = _.filter(items, ({key}) =>
		_.isIn($selectedNUT2IdsStore, key) || _.isIn($preselectedNUTS2IdsStore, key)
	);
	$: refs = [{
		key: 'National average',
		keyAbbr: 'Nat. avg.',
		value: keyValueArrayAverage(items),
		formatFn: refFormatFn
	}];

	$: filteredData = $doFilterRegionsStore
		? _.filter(yearData, ({nuts_id}) =>
			$selectedNUT2IdsStore.includes(nuts_id) ||
			$preselectedNUTS2IdsStore.includes(nuts_id)
		)
		: yearData;

	// colors
	$: valueExtext = filteredData.length && extent(filteredData, getIndicatorValue);
	$: colorScale = filteredData.length && makeColorScale(valueExtext);
	$: colorBins = filteredData.length && makeColorBins(colorScale);
	$: makeKeyToColor = _.pipe([
		keyValueArrayToObject,
		_.mapValuesWith(colorScale)
	]);
	$: keyToColorAll = filteredData.length && makeKeyToColor(items);
	$: keyToColorFiltered = filteredData.length && makeKeyToColor(filteredItems);

	// map
	$: nuts_year_spec = yearData && yearData[0].nuts_year_spec
	$: keyToLabel = nuts_year_spec && yearlyKeyToLabel[nuts_year_spec];
	$: topojson =
		nuts_year_spec && topos[`NUTS_RG_03M_${nuts_year_spec}_4326_LEVL_2_UK`];
	$: baseGeojson = topojson && topoToGeo(topojson, topojsonId);
	$: featuresIndex = baseGeojson &&
		_.index(baseGeojson.features, _.getPath('properties.NUTS_ID'));
	$: filteredGeojson = baseGeojson && _.setPathIn(baseGeojson, 'features',
		_.reduce(selectedKeys, (acc, key) => {
			featuresIndex[key] && acc.push(featuresIndex[key]);
			return acc;
		}, [])
	);
	$: choroplethInnerHeight =
		height - choroplethSafety.top - choroplethSafety.bottom;
	$: choroplethInnerWidth =
		width - choroplethSafety.left - choroplethSafety.right;
	$: baseProjection = baseGeojson &&
		projectionFn()
		.fitSize([choroplethInnerWidth, choroplethInnerHeight], baseGeojson);
	$: filterProjection =
		filteredGeojson &&
		filteredGeojson.features.length &&
		projectionFn()
		.fitSize([choroplethInnerWidth, choroplethInnerHeight], filteredGeojson);
	$: projection = $doFilterRegionsStore ? filterProjection : baseProjection;

	// focus
	$: selectedKeys = $preselectedNUTS2IdsStore.concat($selectedNUT2IdsStore)
	$: focusedKey = $tooltip.isVisible ? $tooltip.regionId : undefined;

	// cities
	$: cities = projection && _.map(majorCities, obj => {
		const [x, y] = projection([obj.lng, obj.lat]);
		const X = x + choroplethSafety.left;
		const length = obj.name.length * labelsFontSize * 0.6;
		const isLeft =
			obj.isLeft && X - labelDx - length < choroplethSafety.left
				? false
				: X + labelDx + length > width - choroplethSafety.right
					? true
					: obj.isLeft;
		const dx = isLeft ? -labelDx : labelDx;
		const dy = obj.isBottom ? 2 * markerRadius : obj.isTop ? -2 * markerRadius : 0;

		return {
			...obj,
			dx,
			dy,
			isLeft,
			X,
			Y: y + choroplethSafety.top,
		}
	});

	/* map tooltip */

	const tooltip = writable({isVisible: false});

	const makeTooltipStyle = event => {
		const {layerX: X, layerY: Y} = event;

		const x = X < width / 2
			? {key: 'left', value: X + 20}
			: {key: 'right', value: width - X + 10};
		const y = Y < height / 2
			? {key: 'top', value: Y + 20}
			: {key: 'bottom', value: height - Y + 10};

		return makeStyle({
			[x.key]: toPx(x.value),
			[y.key]: toPx(y.value),
			visibility: 'visible'
		});
	}
	const onEnteredRegion = ({detail: regionId}) => {
		const hasValue = _.has(keyToValue, regionId);
		const shouldShowValue = $doFilterRegionsStore
			? _.isIn(selectedKeys, regionId)
			: true;

		const value = shouldShowValue && hasValue
			? formatFn(keyToValue[regionId]) + (labelUnit ? ` ${labelUnit}` : '')
			: undefined;

		tooltip.update(mergeObj({
			isVisible: true,
			regionId,
			nuts_label: keyToLabel[regionId],
			style: makeTooltipStyle(event),
			value
		}))
	};
	const onExitedRegion = () => {
		tooltip.update(mergeObj({
			isVisible: false,
			style: 'visibility: hidden'
		}));
	};
	const onMousemoved = event => {
		$tooltip.isVisible && tooltip.update(mergeObj({
			style: makeTooltipStyle(event),
		}));
	};

	/* barchart hovering */

	const onEnteredBar = ({detail: {id: focusedBarKey}}) => {
		focusedKey = focusedBarKey;
	}
	const onExitedBar = () => {
		focusedKey = null;
	}
</script>

<div
	{style}
	class='time_region_value_IdYear'
>
	<header>
		<div>
			<h1>{title} ({year})</h1>
			<p>{subtitle}</p>
		</div>
		<div on:click={toggleInfoModal}>
			<Icon
				glyph={Info}
				size={30}
				strokeWidth={1.5}
			/>
		</div>
	</header>

	<section>
		<div class='controls'>
			<div class='optgroup'>
				<div
					class='globe clickable'
					on:click={toggleGeoModal}
				>
					<Icon
						glyph={Globe}
						size={28}
						stroke={$areThereUnselectedNUTS1Regions
							? defaultTheme.colorSelected
							: defaultTheme.colorRef
						}
						strokeWidth={1.5}
					/>
					{#if $geoModalStore.isVisible}
						<Icon
							glyph={ChevronUp}
							size={24}
							strokeWidth={1}
						/>
					{:else}
						<Icon
							glyph={ChevronDown}
							size={24}
							strokeWidth={1}
						/>
					{/if}
				</div>

				<Switch
					value={$doFilterRegionsStore ? 'Filter' : 'Highlight'}
					values={['Highlight', 'Filter']}
					on:toggled={event => {
						$doFilterRegionsStore = event.detail === 'Filter'
					}}
				/>
			</div>

			<div class='optgroup'>
				<Switch
					value={$currentSchemeIndexStore ? 'Green-Blue' : 'Red-Blue'}
					values={['Red-Blue', 'Green-Blue']}
					on:toggled={event => {
						$currentSchemeIndexStore = event.detail === 'Red-Blue' ? 0 : 1
					}}
				/>
			</div>
		</div>

		{#if filteredData.length}
			<div class='geodistro'>

				<!-- col1 -->
				<div
					class="col col1"
					on:mousemove={onMousemoved}
					bind:clientWidth={width}
					bind:clientHeight={height}
				>
					{#if topojson}
						<svg
							{width}
							{height}
						>
							<ChoroplethG
								{focusedKey}
								{height}
								{projection}
								{selectedKeys}
								{topojson}
								{topojsonId}
								{width}
								geometry={{left: choroplethSafety.left}}
								isInteractive={true}
								key='NUTS_ID'
								keyToColor={$doFilterRegionsStore ? keyToColorFiltered : keyToColorAll}
								on:entered={onEnteredRegion}
								on:exited={onExitedRegion}
								theme={{
									defaultFill: defaultGray,
									defaultStroke: 'gray',
									defaultStrokeWidth: 0.25,
									focusedStroke: theme.colorBlack,
									focusedStrokeWidth: 1.5,
									selectedStroke: theme.colorBlack,
									selectedStrokeWidth: 0.5,
								}}
							/>

							<!-- cities -->
							{#if cities}
							<g class='cities'>
								{#each cities as {isLeft, name, X, Y, dx, dy}}
									<g transform='translate({X},{Y})'>
										<circle r={markerRadius}/>
										<text
											{dx}
											{dy}
											class:isLeft
											class='background'
											font-size={labelsFontSize}
										>{name}</text>
										<text
											{dx}
											{dy}
											class:isLeft
											font-size={labelsFontSize}
										>{name}</text>
									</g>
								{/each}
							</g>
							{/if}

							<!-- legend -->
							<g transform='translate(0,{legendHeight})'>
								<ColorBinsG
									width={legendBarThickness}
									height={legendHeight}
									bins={colorBins}
									flags={{
										isVertical: true,
										withBackground: true,
									}}
									theme={{
										backgroundColor: theme.colorWhite,
										backgroundOpacity: 0.5,
									}}
									ticksFormatFn={formatFn}
								/>
							</g>
						</svg>
					{/if}

					<!-- tooltip -->
					{#if $tooltip.isVisible}
					<div
						class="tooltip"
						style={$tooltip.style}
					>
						<header>
							<span>{$tooltip.regionId}</span>
							{#if $tooltip.value}
							<span>{$tooltip.value}</span>
							{/if}
						</header>
						<div>
							<span>{$tooltip.nuts_label}</span>
						</div>
					</div>
					{/if}
				</div>

				<!-- col2 -->
				<div class="col col2">
					<BarchartVDiv
						{focusedKey}
						{formatFn}
						{keyToLabel}
						{refs}
						{selectedKeys}
						isInteractive={true}
						items={$doFilterRegionsStore ? filteredItems : items}
						keyToColor={keyToColorAll}
						on:entered={onEnteredBar}
						on:exited={onExitedBar}
						shouldResetScroll={true}
						shouldScrollToFocusedKey={true}
						theme={{
							barDefaultColor: defaultGray,
							focusedKeyColor: 'rgb(211, 238, 253)',
							titleFontSize: '1.2rem',
						}}
						title={barchartTitle}
					/>
				</div>

			</div>

		{:else}

			<div class='message'>
				<span>No data</span>
			</div>

		{/if} <!-- filteredData.length  -->

		<!-- geo modal -->
		{#if $geoModalStore.isVisible}
		<GeoFilterModal
			{nutsSelectionStore}
			on:click={toggleGeoModal}
		/>
		{/if}

		{#if $infoModalStore.isVisible}
		<InfoModal
			{api_doc_url}
			{api_type}
			{auth_provider}
			{data_date}
			{description}
			{endpoint_url}
			{is_public}
			{query}
			{region}
			{source_name}
			{source_url}
			{url}
			{year_extent}
			{warning}
			on:click={toggleInfoModal}
		/>
		{/if}
	</section>
</div>

<style>
	.time_region_value_IdYear {
		height: 100%;
		width: 100%;
		user-select: none;
	}

	.time_region_value_IdYear > header {
		height: var(--dimHeaderHeight);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.time_region_value_IdYear > header div:nth-child(1) {
		flex: 1;
	}
	.time_region_value_IdYear > header div:nth-child(1) h1 {
		margin: 0;
	}
	.time_region_value_IdYear > header div:nth-child(1) p {
		font-style: italic;
		font-size: 1rem;
		color: var(--colorRef);
	}
	.time_region_value_IdYear > header div:nth-child(2) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}

	section {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 4rem calc(100% - 4rem);
		height: calc(100% - var(--dimHeaderHeight));
		overflow-y: auto;
		position: relative;
		width: 100%;
	}

	.controls {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: space-between;
		width: 100%;
	}

	.controls > div:not(:last-child) {
		margin-right: 0.5rem;
	}

	.globe {
		border: 1px solid lightgrey;
		margin-right: 0.25rem;
		padding: 0.25rem;
	}
	.optgroup {
		display: flex;
		align-items: center;
		padding: 0.25rem;
	}

	.geodistro {
		display: grid;
		grid-template-columns: 65% 35%;
		grid-template-rows: 100%;
		height: 100%;
		overflow-y: auto;
		position: relative;
		width: 100%;
	}

	.col1 {
		grid-column: 1 / span 1;
		overflow-y: hidden;
		position: relative;
	}

	.col2 {
		grid-column: 2 / span 1;
	}


	:global(.col2 .BarchartVDiv header h2) {
		margin-bottom: 1rem;
	}

	/* cities */

	.cities {
		pointer-events: none;
	}
	.cities circle {
		fill: var(--colorWhite);
		stroke: var(--colorBlack);
	}
	.cities text {
		dominant-baseline: middle;
		fill: var(--colorBlack);
		stroke: none;
	}
	.cities text.isLeft {
		text-anchor: end;
	}
	.cities text.background {
		fill: var(--colorWhite);
		fill-opacity: 0.8;
		stroke: var(--colorWhite);
		stroke-opacity: 0.8;
		stroke-width: 4;
	}

	/* tooltip */

	.tooltip {
		position: absolute;
		pointer-events: none;
		border: 1px solid var(--colorBlack);
		background-color: var(--colorWhite);
		color: var(--colorBlack);
	}
	.tooltip header {
		background-color: var(--colorRef);
		color: var(--colorWhite);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.3rem;
	}
	.tooltip header span:nth-child(1) {
		margin-right: 1rem;
	}
	.tooltip div {
		display: flex;
		align-items: center;
		padding: 0.3rem;
	}

	/* no data message */

	.message {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: center;
		width: 100%;
	}
	.message span {
		font-size: var(--dimFontSizeMessage);
		color: var(--colorRef);
	}
</style>
