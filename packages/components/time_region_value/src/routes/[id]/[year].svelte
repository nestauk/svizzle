<script>
	/* ext deps */

	// utils

	import prune from 'topojson-simplify/src/prune';

	import {makeTopoId} from '@svizzle/atlas/src/utils';
	import {makeStyle, toPx} from '@svizzle/dom';
	import {
		applyFnMap,
		getValue,
		keyValueArrayAverage,
		keyValueArrayToObject,
		mergeObj,
		transformPaths,
	} from '@svizzle/utils';
	import {extent} from 'd3-array';
	import {geoEqualEarth as projectionFn} from 'd3-geo';
	import * as _ from 'lamb';
	import {onMount} from 'svelte';
	import {writable} from 'svelte/store';

	// components

	import {defaultGeometry} from '@svizzle/choropleth/src/utils';
	import BarchartVDiv from '@svizzle/barchart/src/BarchartVDiv.svelte';
	import ChoroplethG from '@svizzle/choropleth/src/ChoroplethG.svelte';
	import ColorBinsDiv from '@svizzle/legend/src/ColorBinsDiv.svelte';
	import ColorBinsG from '@svizzle/legend/src/ColorBinsG.svelte';
	import LoadingView from '@svizzle/ui/src/LoadingView.svelte';
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

	import {_POIs} from 'stores/data';
	import {_isSmallScreen, _screenClasses} from 'stores/layout';
	import {
		_doFilterRegions,
		_geoModal,
		_infoModal,
		hideGeoModal,
		hideInfoModal,
		toggleGeoModal,
		toggleInfoModal,
	} from 'stores/modals';
	import {
		_navFlags,
		_viewsClasses,
		setRoute,
		showView,
	} from 'stores/navigation';
	import {
		_getFeatureKey,
		_hasValidKey,
		_preselectedNUTS2Ids,
		_regionSettings,
		_selectedNUT2Ids,
		_someUnselectedRegions,
	} from 'stores/regionSelection';
	import {_availableYears, _selectedYear} from 'stores/selection';
	import {
		_makeColorBins,
		_makeColorScale,
		_theme,
	} from 'stores/theme';

	/* local utils  */

	import config from 'config';
	import {getTopojson, makeGeojson, topoCache} from 'utils/boundaries';
	import {getNutsId} from 'utils/domain';
	import {isClientSide} from 'utils/env';
	import {makeGetIndicatorFormatOf, makeGetRefFormatOf} from 'utils/format';

	/* data */

	import yearlyKeyToLabel from 'data/NUTS2_UK_labels';
	// import yearlyKeyToLabel from '@svizzle/atlas/NUTS2_UK_labels'; // TODO

	/* consts */

	const defaultGray = '#f3f3f3';
	const fetchingMessage = 'Fetching boundaries...';
	const legendBarThickness = 40;
	const markerRadius = 4;
	const labelsFontSize = 13;
	const labelPadding = labelsFontSize / 2;
	const labelDx = markerRadius + labelPadding;

	/* props */

	export let _lookup = null;
	export let data = null;
	export let id = null;
	export let types = null;
	export let year = null;

	/* init */

	onMount(() => {
		setRoute('IdYear');
	});

	/* local vars */

	// bound
	let mapHeight;
	let mapWidth;

	// rest
	let fetchedTopojson;
	let selectedKeys = [];

	/* reactive vars */

	// navigation
	$: $_isSmallScreen && hideGeoModal();
	$: $_isSmallScreen && hideInfoModal();
	$: id && showView('map');
	$: id && year && hideInfoModal();
	$: _selectedYear.set(Number(year));
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
	} = $_lookup[id] || {});
	// can't as `_lookup` is a derived
	// $: data && _lookup.update(_.setPath(`${id}.data`, data));

	// update stores
	$: _availableYears.set(availableYears);

	// utils
	$: getIndicatorFormat = makeGetIndicatorFormatOf(id);
	$: formatFn = getIndicatorFormat($_lookup);
	$: getRefFormatFn = makeGetRefFormatOf(id);
	$: refFormatFn = getRefFormatFn($_lookup);
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
	$: choroplethSafety = $_isSmallScreen
		? defaultGeometry
		: {...defaultGeometry, left: legendBarThickness * 2};

	// selection
	// $: indicatorData = $_lookup[id].data; // FIXME
	$: yearData = data && data.filter(obj => obj.year === year);
	$: items = yearData && makeItems(yearData);
	$: filteredItems = _.filter(items, ({key}) =>
		_.isIn($_selectedNUT2Ids, key) || _.isIn($_preselectedNUTS2Ids, key)
	);
	$: filteredData = $_doFilterRegions
		? _.filter(yearData, ({nuts_id}) =>
			$_selectedNUT2Ids.includes(nuts_id) ||
			$_preselectedNUTS2Ids.includes(nuts_id)
		)
		: yearData;
	$: noData = filteredData.length === 0;

	// colors
	$: valueExtext = filteredData.length && extent(filteredData, getIndicatorValue);
	$: colorScale = filteredData.length && $_makeColorScale(valueExtext);
	$: colorBins = filteredData.length && $_makeColorBins(colorScale);
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
	$: regionYearSpec = yearData && yearData[0].nuts_year_spec;
	$: keyToLabel = regionYearSpec && yearlyKeyToLabel[regionYearSpec];
	$: regionId = regionYearSpec && makeTopoId({
		level: $_regionSettings.level,
		level0: $_regionSettings.level0,
		resolution: $_regionSettings.resolution,
		type: $_regionSettings.type,
		year: regionYearSpec,
	});
	$: geometriesPath = `objects.${$_regionSettings.objectId}.geometries`;
	$: filterTopojson = _.pipe([
		transformPaths({
			[geometriesPath]: _.filterWith($_hasValidKey)
		}),
		prune
	]);
	$: isClientSide && (async () => {
		fetchedTopojson = await getTopojson(regionId)
	})();
	$: topojson = fetchedTopojson && filterTopojson(fetchedTopojson);
	$: geojson = topojson && makeGeojson({
		objectId: $_regionSettings.objectId,
		regionId,
		topojson,
	});
	$: featuresIndex = geojson && _.index(geojson.features, $_getFeatureKey);
	$: filteredGeojson = geojson && _.setPathIn(geojson, 'features',
		_.reduce(selectedKeys, (acc, key) => {
			featuresIndex[key] && acc.push(featuresIndex[key]);
			return acc;
		}, [])
	);
	$: choroplethInnerHeight =
		mapHeight - choroplethSafety.top - choroplethSafety.bottom;
	$: choroplethInnerWidth =
		mapWidth - choroplethSafety.left - choroplethSafety.right;
	$: baseProjection = geojson &&
		projectionFn()
		.fitSize([choroplethInnerWidth, choroplethInnerHeight], geojson);
	$: filterProjection =
		filteredGeojson &&
		filteredGeojson.features.length &&
		projectionFn()
		.fitSize([choroplethInnerWidth, choroplethInnerHeight], filteredGeojson);
	$: projection = $_doFilterRegions ? filterProjection : baseProjection;

	// flags
	$: showMap = mapHeight && mapWidth && topoCache[regionId] && topojson;

	// focus
	$: selectedKeys = $_preselectedNUTS2Ids.concat($_selectedNUT2Ids)
	$: focusedKey = $_tooltip.isVisible ? $_tooltip.areaId : undefined;

	// POIs
	$: POIsLayout = $_navFlags.showPOIs && projection && _.map($_POIs, obj => {
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

	const _tooltip = writable({isVisible: false});

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
	const onEnteredArea = ({detail: areaId}) => {
		const hasValue = _.has(keyToValue, areaId);
		const shouldShowValue = $_doFilterRegions
			? _.isIn(selectedKeys, areaId)
			: true;

		const value = shouldShowValue && hasValue
			? formatFn(keyToValue[areaId]) + (labelUnit ? ` ${labelUnit}` : '')
			: undefined;

		_tooltip.update(mergeObj({
			areaId,
			isVisible: true,
			regionLabel: keyToLabel[areaId],
			style: makeTooltipStyle(event),
			value
		}))
	};
	const onExitedArea = () => {
		_tooltip.update(mergeObj({
			isVisible: false,
			style: 'visibility: hidden'
		}));
	};
	const onMousemoved = event => {
		$_tooltip.isVisible && _tooltip.update(mergeObj({
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

	const toggledFiltering = ({detail}) => {
		$_doFilterRegions = detail === 'Filter'
	};
</script>

<div class='time_region_value_IdYear {$_screenClasses}'>
	<Header
		{subtitle}
		{title}
		on:click={toggleInfoModal}
	/>

	<div
		class:noData
		class='viewport {$_viewsClasses}'
	>
		{#if $_isSmallScreen}

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
								backgroundColor: $_theme.colorWhite,
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
										height={mapHeight}
										isInteractive={true}
										key={$_regionSettings.key}
										keyToColor={$_doFilterRegions
											? keyToColorFiltered
											: keyToColorAll
										}
										on:entered={onEnteredArea}
										on:exited={onExitedArea}
										theme={{
											defaultFill: defaultGray,
											defaultStroke: 'gray',
											defaultStrokeWidth: 0.25,
											focusedStroke: $_theme.colorBlack,
											focusedStrokeWidth: 1.5,
											selectedStroke: $_theme.colorBlack,
											selectedStrokeWidth: 0.5,
										}}
										topojsonId={$_regionSettings.objectId}
										width={mapWidth}
									/>
								</svg>
							{:else}
								<LoadingView
									message={fetchingMessage}
									stroke={$_theme.colorMain}
								/>
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
								backgroundColor: $_theme.colorWhite,
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
							items={$_doFilterRegions ? filteredItems : items}
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
					{url}
					{warning}
					{year_extent}
				/>
			</div>

			<!-- settings -->

			<div class='view settings'>
				<SettingsView
					flags={{
						doFilter: $_doFilterRegions,
						showRankingControl: false,
					}}
					handlers={{toggledFiltering}}
				/>
			</div>

		{:else}

			<!-- medium + -->

			<div class='topbox'>
				<SettingsRow
					flags={{
						doFilter: $_doFilterRegions,
						isGeoModalVisible: $_geoModal.isVisible,
						showRankingControl: false,
						someUnselectedRegions: $_someUnselectedRegions,
					}}
					handlers={{
						toggledFiltering,
						toggledGeoModal: toggleGeoModal,
					}}
				/>
			</div>

			<div
				class:noData
				class='content'
			>
				{#if noData}
					<MessageView text='No data' />
				{:else}

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
									geometry={{left: choroplethSafety.left}}
									height={mapHeight}
									isInteractive={true}
									key={$_regionSettings.key}
									keyToColor={$_doFilterRegions
										? keyToColorFiltered
										: keyToColorAll
									}
									on:entered={onEnteredArea}
									on:exited={onExitedArea}
									theme={{
										defaultFill: defaultGray,
										defaultStroke: 'gray',
										defaultStrokeWidth: 0.25,
										focusedStroke: $_theme.colorBlack,
										focusedStrokeWidth: 1.5,
										selectedStroke: $_theme.colorBlack,
										selectedStrokeWidth: 0.5,
									}}
									topojsonId={$_regionSettings.objectId}
									width={mapWidth}
								/>

								<!-- POIs -->

								{#if POIsLayout}
									<g class='POIs'>
										{#each POIsLayout as {isLeft, name, X, Y, dx, dy}}
											<g transform='translate({X},{Y})'>
												<circle r={markerRadius} />
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
											backgroundColor: $_theme.colorWhite,
											backgroundOpacity: 0.5,
										}}
										ticksFormatFn={formatFn}
									/>
								</g>

							</svg>

							<!-- tooltip -->

							{#if $_tooltip.isVisible}
								<div
									class='tooltip'
									style={$_tooltip.style}
								>
									<header>
										<span>{$_tooltip.areaId}</span>
										{#if $_tooltip.value}
											<span>{$_tooltip.value}</span>
										{/if}
									</header>
									<div>
										<span>{$_tooltip.regionLabel}</span>
									</div>
								</div>
							{/if}

						{:else}
							<LoadingView
								message={fetchingMessage}
								stroke={$_theme.colorMain}
							/>
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
							items={$_doFilterRegions ? filteredItems : items}
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

				{/if} <!-- filteredData.length  -->

			</div>	<!-- .content -->

			<!-- modals -->

			{#if $_geoModal.isVisible}
				<GeoFilterModal on:click={toggleGeoModal} />
			{:else if $_infoModal.isVisible}
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

	/* POIs */

	.POIs {
		pointer-events: none;
	}
	.POIs circle {
		fill: var(--colorWhite);
		stroke: var(--colorBlack);
	}
	.POIs text {
		dominant-baseline: middle;
		fill: var(--colorBlack);
		stroke: none;
	}
	.POIs text.isLeft {
		text-anchor: end;
	}
	.POIs text.background {
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
