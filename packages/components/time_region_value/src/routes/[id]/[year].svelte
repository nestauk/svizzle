<script>
	/* ext deps */

	// utils

	import {makeStyle, toPx} from '@svizzle/dom';
	import {areAllTruthy, mergeObj} from '@svizzle/utils';
	import {geoEqualEarth as projectionFn} from 'd3-geo';
	import * as _ from 'lamb';
	import {onMount} from 'svelte';
	import {writable} from 'svelte/store';

	// components

	import {defaultGeometry} from '@svizzle/choropleth/src/shared';
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

	import {_lookup} from 'stores/dataset';
	import {
		_filteredGeojson,
		_geojson,
		_getAtlasIdFromRegionId,
		_getRegionIdFromAtlasId,
		_isTopoFetching,
		_topojson,
	} from 'stores/geoBoundaries';
	import {
		_formatFn,
		_indicator,
		_selectedRegionAtlasIds,
		_selectedRegionIds,
	} from 'stores/indicator';
	import {_isCurrentDataEmpty} from 'stores/indicatorCurrent';
	import {
		_barchartRefs,
		_regionIdToColor,
		_regionIdToColorFn,
		_regionIdToValue,
		_regionIdValuePairs,
	} from 'stores/indicatorYear';
	import {_isSmallScreen, _screenClasses} from 'stores/layout';
	import {_colorBins} from 'stores/legend';
	import {
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
	import {_POIs} from 'stores/POIs';
	import {_regionSettings} from 'stores/regionSettings';
	import {
		_doFilterRegions,
		_isRegionsSelectionDirty,
		setCurrentLevel,
	} from 'stores/selectedRegions';
	import {setSelectedYear} from 'stores/selectedYear';
	import {_theme} from 'stores/theme';

	/* local utils  */

	import config from 'config';
	import {regionIdToName} from 'utils/domain';

	/* data */

	/* consts */

	// IDEA move these to config?
	const defaultGray = '#f3f3f3';
	const fetchingMessage = 'Fetching boundaries...';
	const legendBarThickness = 40;
	const markerRadius = 4;
	const labelsFontSize = 13;
	const labelPadding = labelsFontSize / 2;
	const labelDx = markerRadius + labelPadding;

	/* props */

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

	/* reactive vars */

	// navigation
	$: $_isSmallScreen && hideGeoModal();
	$: $_isSmallScreen && hideInfoModal();
	$: id && year && hideInfoModal();
	$: id && showView('map');
	$: id && data && _indicator.set({data, id});
	$: setSelectedYear(year);
	$: ({
		api_doc_url,
		api_type,
		auth_provider,
		data_date,
		description,
		endpoint_url,
		is_experimental,
		is_public,
		query,
		region_types,
		schema,
		source_name,
		source_url,
		subtitle,
		title,
		url,
		warning,
		year_extent,
	} = $_lookup[id] || {});

	// layout
	$: legendHeight = mapHeight / 3;
	$: choroplethSafety = $_isSmallScreen
		? defaultGeometry
		: {...defaultGeometry, left: legendBarThickness * 2};
	$: choroplethInnerHeight =
		mapHeight - choroplethSafety.top - choroplethSafety.bottom;
	$: choroplethInnerWidth =
		mapWidth - choroplethSafety.left - choroplethSafety.right;

	// labels

	// TODO move to stores/indicator.js
	$: labelUnit =
		schema.value.unit_string ||
		schema.value.type &&
		_.has(types, schema.value.type) &&
		_.has(types[schema.value.type], 'unit_string') &&
		types[schema.value.type].unit_string;

	// TODO move to stores/indicatorYear.js
	$: barchartTitle = schema.value.label + (labelUnit ? ` [${labelUnit}]` : '');

	// map
	$: baseProjection =
		$_geojson &&
		projectionFn().fitSize(
			[choroplethInnerWidth, choroplethInnerHeight],
			$_geojson
		);
	$: filteredProjection =
		$_filteredGeojson?.features.length > 0 &&
		projectionFn().fitSize(
			[choroplethInnerWidth, choroplethInnerHeight],
			$_filteredGeojson
		);
	$: projection = $_doFilterRegions ? filteredProjection : baseProjection;

	// flags
	$: showMap = !$_isTopoFetching && areAllTruthy([mapHeight, mapWidth]);

	// focus
	$: focusedAtlasId = $_tooltip.isVisible ? $_tooltip.atlasId : undefined;
	$: focusedRegionId = $_getRegionIdFromAtlasId(focusedAtlasId);

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
	const onEnteredArea = event => {
		const {detail: regionId} = event;

		// FIXME use `atlasId` in topojson
		const atlasId = $_getAtlasIdFromRegionId(regionId);
		const hasValue = _.has($_regionIdToValue, atlasId);
		const shouldShowValue = $_doFilterRegions
			? _.isIn($_selectedRegionAtlasIds, atlasId)
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
			value,
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

	const onEnteredBar = ({detail: {id: focusedBarAtlasId}}) => {
		focusedAtlasId = focusedBarAtlasId;
	}
	const onExitedBar = () => {
		focusedAtlasId = null;
	}

	/* settings handlers */

	const setLevel = ({detail: level}) => setCurrentLevel(level);
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
		class:noData={$_isCurrentDataEmpty}
		class='viewport {$_viewsClasses}'
	>
		{#if $_isSmallScreen}

			<!-- small -->

			<!-- map -->

			<div
				class:noData={$_isCurrentDataEmpty}
				class='view map'
			>
				{#if $_isCurrentDataEmpty}
					<MessageView text={config.noDataMessage} />
				{:else}
					<div class='topbox'>
						{#if $_colorBins}
							<ColorBinsDiv
								bins={$_colorBins}
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
								ticksFormatFn={$_formatFn}
							/>
						{:else}
							<MessageView text={config.noLegendMessage} />
						{/if}
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
										{projection}
										focusedKey={focusedRegionId}
										height={mapHeight}
										isInteractive={true}
										key={$_regionSettings.key}
										keyToColorFn={$_regionIdToColorFn}
										on:entered={onEnteredArea}
										on:exited={onExitedArea}
										selectedKeys={$_selectedRegionIds}
										theme={{
											defaultFill: defaultGray,
											defaultStroke: 'gray',
											defaultStrokeWidth: 0.25,
											focusedStroke: $_theme.colorBlack,
											focusedStrokeWidth: 1.5,
											selectedStroke: $_theme.colorBlack,
											selectedStrokeWidth: 0.5,
										}}
										topojson={$_topojson}
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
				class:noData={$_isCurrentDataEmpty}
				class='view barchart'
			>
				{#if $_isCurrentDataEmpty}
					<MessageView text={config.noDataMessage} />
				{:else}
					<div class='topbox'>
						{#if $_colorBins}
							<ColorBinsDiv
								bins={$_colorBins}
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
								ticksFormatFn={$_formatFn}
							/>
						{:else}
							<MessageView text={config.noLegendMessage} />
						{/if}
					</div>
					<div class='content'>
						<BarchartVDiv
							focusedKey={focusedAtlasId}
							formatFn={$_formatFn}
							isInteractive={true}
							items={$_regionIdValuePairs}
							keyToColor={$_regionIdToColor}
							keyToLabel={regionIdToName}
							on:entered={onEnteredBar}
							on:exited={onExitedBar}
							refs={$_barchartRefs}
							selectedKeys={$_selectedRegionAtlasIds}
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
					{region_types}
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
					handlers={{
						setLevel,
						toggledFiltering,
					}}
				/>
			</div>

		{:else}

			<!-- medium + -->

			<!-- topbox -->

			<div class='topbox'>
				<SettingsRow
					flags={{
						doFilter: $_doFilterRegions,
						isGeoModalVisible: $_geoModal.isVisible,
						isRegionsSelectionDirty: $_isRegionsSelectionDirty,
						showRankingControl: false,
					}}
					handlers={{
						setLevel,
						toggledFiltering,
						toggledGeoModal: toggleGeoModal,
					}}
				/>
			</div>

			<!-- content -->

			<div
				class:noData={$_isCurrentDataEmpty}
				class='content'
			>
				{#if $_isCurrentDataEmpty}
					<MessageView text={config.noDataMessage} />
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
									{projection}
									focusedKey={focusedRegionId}
									geometry={{left: choroplethSafety.left}}
									height={mapHeight}
									isInteractive={true}
									key={$_regionSettings.key}
									keyToColorFn={$_regionIdToColorFn}
									on:entered={onEnteredArea}
									on:exited={onExitedArea}
									selectedKeys={$_selectedRegionIds}
									theme={{
										defaultFill: defaultGray,
										defaultStroke: 'gray',
										defaultStrokeWidth: 0.25,
										focusedStroke: $_theme.colorBlack,
										focusedStrokeWidth: 1.5,
										selectedStroke: $_theme.colorBlack,
										selectedStrokeWidth: 0.5,
									}}
									topojson={$_topojson}
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

								{#if $_colorBins}
									<g transform='translate(0,{legendHeight})'>
										<ColorBinsG
											bins={$_colorBins}
											flags={{
												isVertical: true,
												withBackground: true,
											}}
											height={legendHeight}
											theme={{
												backgroundColor: $_theme.colorWhite,
												backgroundOpacity: 0.5,
											}}
											ticksFormatFn={$_formatFn}
											width={legendBarThickness}
										/>
									</g>
								{/if}

							</svg>

							<!-- tooltip -->

							{#if $_tooltip.isVisible}
								<div
									class='tooltip'
									style={$_tooltip.style}
								>
									<header>
										<span>{$_tooltip.regionId}</span>
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
							focusedKey={focusedAtlasId}
							formatFn={$_formatFn}
							isInteractive={true}
							items={$_regionIdValuePairs}
							keyToColor={$_regionIdToColor}
							keyToLabel={regionIdToName}
							on:entered={onEnteredBar}
							on:exited={onExitedBar}
							refs={$_barchartRefs}
							selectedKeys={$_selectedRegionAtlasIds}
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

				{/if} <!-- noData  -->

				<!-- geo modal -->

				{#if $_geoModal.isVisible}
					<GeoFilterModal on:click={toggleGeoModal} />
				{/if}

			</div>	<!-- .content -->

			<!-- info modal -->

			{#if $_infoModal.isVisible}
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
					{region_types}
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
		width: 100%;
	}

	.viewport {
		display: grid;
		grid-template-rows: 100%;
		height: 100%;
		position: relative; /* info modal */

		/* overflow-y: hidden; */
		/* was: prevents svg charts from getting taller indefinitely */
		/* FIXME do we still need it? */
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
		position: relative;	/* geo modal */
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
		position: relative;	/* geo modal */
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
