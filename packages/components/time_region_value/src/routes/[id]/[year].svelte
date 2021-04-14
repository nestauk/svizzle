<script>
	/* ext deps */

	// utils

	import {makeStyle, makeStyleVars, toPx} from '@svizzle/dom';
	import {
		applyFnMap,
		getValue,
		keyValueArrayAverage,
		keyValueArrayToObject,
		mergeObj,
	} from '@svizzle/utils';
	import {extent} from 'd3-array';
	import {geoEqualEarth as projectionFn} from 'd3-geo';
	import * as _ from 'lamb';
	import {onMount} from 'svelte';
	import {writable} from 'svelte/store';

	// components

	import {topoToGeo, defaultGeometry} from '@svizzle/choropleth/src/utils';
	import BarchartVDiv from '@svizzle/barchart/src/BarchartVDiv.svelte';
	import ChoroplethG from '@svizzle/choropleth/src/ChoroplethG.svelte';
	import ColorBinsDiv from '@svizzle/legend/src/ColorBinsDiv.svelte';
	import ColorBinsG from '@svizzle/legend/src/ColorBinsG.svelte';
	import MessageView from '@svizzle/ui/src/MessageView.svelte';

	/* local deps */

	// components

	import GeoFilterModal from 'components/GeoFilterModal.svelte';
	import Header from 'components/Header.svelte';
	import InfoModal from 'components/Info/InfoModal.svelte';
	import InfoView from 'components/Info/InfoView.svelte';
	import SettingsRow from 'components/SettingsRow.svelte';
	import SettingsView from 'components/SettingsView.svelte';

	// stores

	import {
		currentSchemeIndexStore,
		makeColorBinsStore,
		makeColorScaleStore,
	} from 'stores/colorScale';
	import {isSmallScreen, screenClasses} from 'stores/layout';
	import {
		doFilterRegionsStore,
		geoModalStore,
		hideGeoModal,
		hideInfoModal,
		infoModalStore,
		toggleGeoModal,
		toggleInfoModal,
	} from 'stores/modals';
	import {
		setRoute,
		showView,
		viewsClasses,
	} from 'stores/navigation';
	import {
		noSelectedRegions,
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
	import defaultTheme from 'theme';
	import config from 'config';

	/* data */

	import yearlyKeyToLabel from 'data/NUTS2_UK_labels';
	// import yearlyKeyToLabel from '@svizzle/atlas/NUTS2_UK_labels'; // TODO

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

	// rest
	export let data;
	export let id;
	export let lookupStore;
	export let types;
	export let year;

	/* init */

	onMount(() => {
		setRoute('IdYear');
	});

	/* local vars */

	// bound
	let mapHeight;
	let mapWidth;

	// rest
	let selectedKeys = [];

	/* reactive vars */

	// navigation
	$: $isSmallScreen && hideGeoModal();
	$: $isSmallScreen && hideInfoModal();
	$: id && showView('map');
	$: id && year && hideInfoModal();
	$: selectedYearStore.set(Number(year));
	$: ({
		api_doc_url,
		api_type,
		auth_provider,
		availableYears,
		data_date,
		description,
		endpoint_url,
		is_experimental,
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
	// can't as `lookupStore` could be a derived
	// $: data && lookupStore.update(_.setPath(`${id}.data`, data));

	// update stores
	$: availableYearsStore.set(availableYears);

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;

	// style
	$: style = makeStyleVars(theme);

	// utils
	$: getIndicatorFormat = makeGetIndicatorFormatOf(id);
	$: formatFn = getIndicatorFormat($lookupStore);
	$: getRefFormatFn = makeGetRefFormatOf(id);
	$: refFormatFn = getRefFormatFn($lookupStore);
	$: getIndicatorValue = _.getKey(id);
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

	// layout
	$: legendHeight = mapHeight / 3;
	$: choroplethSafety = $isSmallScreen
		? defaultGeometry
		: {...defaultGeometry, left: legendBarThickness * 2};
	$: noData = filteredData.length === 0;

	// flags
	$: showMap = mapHeight && mapWidth && topojson;

	// selection
	// $: indicatorData = $lookupStore[id].data; // FIXME not guaranteed
	$: yearData = data && data.filter(obj => obj.year === year);
	$: items = yearData && makeItems(yearData);
	$: filteredItems = _.filter(items, ({key}) =>
		_.isIn($selectedNUT2IdsStore, key) || _.isIn($preselectedNUTS2IdsStore, key)
	);
	$: filteredData = $doFilterRegionsStore
		? _.filter(yearData, ({nuts_id}) =>
			$selectedNUT2IdsStore.includes(nuts_id) ||
			$preselectedNUTS2IdsStore.includes(nuts_id)
		)
		: yearData;

	// colors
	$: makeColorScale = $makeColorScaleStore;
	$: makeColorBins = $makeColorBinsStore;
	$: valueExtext = filteredData.length && extent(filteredData, getIndicatorValue);
	$: colorScale = filteredData.length && makeColorScale(valueExtext);
	$: colorBins = filteredData.length && makeColorBins(colorScale);
	$: makeKeyToColor = _.pipe([
		keyValueArrayToObject,
		_.mapValuesWith(colorScale)
	]);
	$: keyToColorAll = filteredData.length && makeKeyToColor(items);
	$: keyToColorFiltered = filteredData.length && makeKeyToColor(filteredItems);

	// labels
	$: labelUnit =
		schema.value.unit_string ||
		schema.value.type &&
		_.has(types, schema.value.type) &&
		_.has(types[schema.value.type], 'unit_string') &&
		types[schema.value.type].unit_string;
	$: barchartTitle = schema.value.label + (labelUnit ? ` [${labelUnit}]` : '');
	$: barchartRefs = [{
		key: 'National average',
		keyAbbr: 'Nat. avg.',
		value: keyValueArrayAverage(items),
		formatFn: refFormatFn
	}];

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
		mapHeight - choroplethSafety.top - choroplethSafety.bottom;
	$: choroplethInnerWidth =
		mapWidth - choroplethSafety.left - choroplethSafety.right;
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
				: X + labelDx + length > mapWidth - choroplethSafety.right
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

		const x = X < mapWidth / 2
			? {key: 'left', value: X + 20}
			: {key: 'right', value: mapWidth - X + 10};
		const y = Y < mapHeight / 2
			? {key: 'top', value: Y + 20}
			: {key: 'bottom', value: mapHeight - Y + 10};

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

	/* settings handlers */

	const toggledColorScheme = ({detail}) => {
		currentSchemeIndexStore.set(detail === 'Red-Blue' ? 0 : 1)
	};
	const toggledFiltering = ({detail}) => {
		$doFilterRegionsStore = detail === 'Filter'
	};
</script>

<div
	{style}
	class='time_region_value_IdYear {$screenClasses}'
>
	<Header
		{subtitle}
		{title}
		on:click={toggleInfoModal}
	/>

	<div
		class='viewport {$viewsClasses}'
		class:noData
	>
		{#if $isSmallScreen}

			<!-- small -->

			<!-- map -->

			<div
				class:noData
				class='view map'
			>
				{#if noData}
					<MessageView text={config.noDataMessage} />
				{:else}
					<div class='topbox'>
						<ColorBinsDiv
							bins={colorBins}
							geometry={{
								barThickness: 15,
								left: 30,
								right: 30,
							}}
							flags={{
								withBackground: true,
								showTicksExtentOnly: true,
							}}
							theme={{
								backgroundColor: theme.colorWhite,
								backgroundOpacity: 0.5,
							}}
							ticksFormatFn={formatFn}
						/>
					</div>
					<div class='content'>
						<div
							bind:clientHeight={mapHeight}
							bind:clientWidth={mapWidth}
							class='map'
							on:mousemove={onMousemoved}
						>
							{#if showMap}
								<svg
									height={mapHeight}
									width={mapWidth}
								>
									<ChoroplethG
										{focusedKey}
										{projection}
										{selectedKeys}
										{topojson}
										{topojsonId}
										height={mapHeight}
										isInteractive={true}
										key='NUTS_ID'
										keyToColor={$doFilterRegionsStore
											? keyToColorFiltered
											: keyToColorAll
										}
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
										width={mapWidth}
									/>
								</svg>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<!-- barchart -->

			<div
				class:noData
				class='view barchart'
			>
				{#if noData}
					<MessageView text={config.noDataMessage} />
				{:else}
					<div class='topbox'>
						<ColorBinsDiv
							bins={colorBins}
							geometry={{
								barThickness: 15,
								left: 30,
								right: 30,
							}}
							flags={{
								withBackground: true,
								showTicksExtentOnly: true,
							}}
							theme={{
								backgroundColor: theme.colorWhite,
								backgroundOpacity: 0.5,
							}}
							ticksFormatFn={formatFn}
						/>
					</div>
					<div class='content'>
						<BarchartVDiv
							{focusedKey}
							{formatFn}
							{keyToLabel}
							{selectedKeys}
							isInteractive={true}
							items={$doFilterRegionsStore ? filteredItems : items}
							keyToColor={keyToColorAll}
							on:entered={onEnteredBar}
							on:exited={onExitedBar}
							refs={barchartRefs}
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
				{/if}
			</div>

			<!-- info -->

			<div class='view info'>
				<InfoView
					{api_doc_url}
					{api_type}
					{auth_provider}
					{data_date}
					{description}
					{endpoint_url}
					{is_experimental}
					{is_public}
					{query}
					{region}
					{source_name}
					{source_url}
					{theme}
					{url}
					{warning}
					{year_extent}
				/>
			</div>

			<!-- settings -->

			<div class='view settings'>
				<SettingsView
					flags={{
						doFilter: $doFilterRegionsStore,
						showRankingControl: false,
					}}
					handlers={{
						toggledColorScheme,
						toggledFiltering,
					}}
				/>
			</div>

		{:else}

			<!-- medium + -->

			<div class='topbox'>
				<SettingsRow
					colorScheme={{
						value: 'Red-Blue',
						values: ['Red-Blue', 'Green-Blue']
					}}
					flags={{
						noSelectedRegions: $noSelectedRegions,
						doFilter: $doFilterRegionsStore,
						isGeoModalVisible: $geoModalStore.isVisible,
						showRankingControl: false
					}}
					handlers={{
						toggledColorScheme,
						toggledFiltering,
						toggledGeoModal: toggleGeoModal,
					}}
					theme={_.pick(theme, ['colorBase', 'colorSelected'])}
				/>
			</div>

			<div
				{style}
				class='content'
				class:noData
			>
				{#if filteredData.length}
					<!-- map -->

					<div
						bind:clientHeight={mapHeight}
						bind:clientWidth={mapWidth}
						class='map'
						on:mousemove={onMousemoved}
					>
						{#if showMap}
							<svg
								height={mapHeight}
								width={mapWidth}
							>
								<!-- choropleth -->

								<ChoroplethG
									{focusedKey}
									{projection}
									{selectedKeys}
									{topojson}
									{topojsonId}
									geometry={{left: choroplethSafety.left}}
									height={mapHeight}
									isInteractive={true}
									key='NUTS_ID'
									keyToColor={$doFilterRegionsStore
										? keyToColorFiltered
										: keyToColorAll
									}
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
									width={mapWidth}
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

							<!-- tooltip -->

							{#if $tooltip.isVisible}
								<div
									class='tooltip'
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

						{/if}	<!-- {#if showMap} -->
					</div>

					<!-- barchart -->

					<div class='barchart'>
						<BarchartVDiv
							{focusedKey}
							{formatFn}
							{keyToLabel}
							{selectedKeys}
							isInteractive={true}
							items={$doFilterRegionsStore ? filteredItems : items}
							keyToColor={keyToColorAll}
							on:entered={onEnteredBar}
							on:exited={onExitedBar}
							refs={barchartRefs}
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

				{:else}

					<MessageView text='No data' />

				{/if} <!-- filteredData.length  -->

			</div>	<!-- .content -->

			<!-- modals -->

			{#if $geoModalStore.isVisible}
				<GeoFilterModal
					{nutsSelectionStore}
					on:click={toggleGeoModal}
				/>
			{:else if $infoModalStore.isVisible}
				<InfoModal
					{api_doc_url}
					{api_type}
					{auth_provider}
					{data_date}
					{description}
					{endpoint_url}
					{is_experimental}
					{is_public}
					{query}
					{region}
					{source_name}
					{source_url}
					{theme}
					{url}
					{year_extent}
					{warning}
					on:click={toggleInfoModal}
				/>
			{/if}

		{/if}	<!-- medium + -->
	</div>
</div>

<style>
	.time_region_value_IdYear {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: min-content 1fr;
		height: 100%;
		/* user-select: none; */
		width: 100%;
	}

	.viewport {
		display: grid;
		grid-template-rows: 100%;
		height: 100%;
		overflow-y: hidden; /* prevents svg charts from getting taller indefinitely */
		position: relative; /* modals */
	}

	/* small */

	.small .viewport {
		grid-template-areas: 'map barchart info settings';
		grid-template-columns: 25% 25% 25% 25%;
		overflow-y: hidden; /* prevents svg charts from getting taller indefinitely */
		width: 400%;
		/*
			TODO
			Originally we had sliding views in the viewport but when we slide
			the map view to the barchart view we see the legend sliding too, to then
			reappear identical, not great as it might make the user wonder
			what's changed. We'd need to have a new vieport hosting the map and
			the barchart so that the legend would remain still while we navigate.
		*/
		/* transition:
			transform
			var(--transDuration)
			var(--transFunction); */
	}
	.small .viewport.map {
		transform: translate(0%, 0px);
	}
	.small .viewport.barchart {
		transform: translate(-25%, 0px);
	}
	.small .viewport.info {
		transform: translate(-50%, 0px);
		padding: 1.5rem;
	}
	.small .viewport.settings {
		transform: translate(-75%, 0px);
	}

	.view.noData {
		display: block !important;
	}
	.view {
		height: 100%;
		width: 100%;
		padding: 0 var(--dimPadding);
	}
	.view.map {
		grid-area: map;
	}
	.view.barchart {
		grid-area: barchart;
	}
	.view.map,
	.view.barchart {
		display: grid;
		grid-template-areas: 'topbox' 'content';
		grid-template-columns: 100%;
		grid-template-rows: 15% 85%;
	}
	.view.map .topbox,
	.view.barchart .topbox {
		grid-area: topbox;
	}
	.view.map .content,
	.view.barchart .content {
		grid-area: content;
	}
	.view.map .content .map {
		height: 100%;
		width: 100%;
	}
	.view.info {
		grid-area: info;
	}
	.view.settings {
		grid-area: settings;
	}

	/* medium */

	.medium .viewport {
		grid-template-areas: 'topbox' 'content';
		grid-template-columns: 100%;
		grid-template-rows: 10% 90%;
		padding: 0 var(--dimPadding) var(--dimPadding) var(--dimPadding);
		position: relative;
		width: 100%;
		overflow-y: hidden;
	}

	.medium .viewport .topbox {
		grid-area: topbox;
	}
	.medium .viewport .content.noData {
		display: block;
	}
	.medium .viewport .content {
		display: grid;
		grid-area: content;
		grid-template-areas: 'map barchart';
		grid-template-columns: 65% 35%;
		grid-template-rows: 100%;
	}
	.medium .viewport .content .map {
		grid-area: map;
	}
	.medium .viewport .content .barchart {
		grid-area: barchart;
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
