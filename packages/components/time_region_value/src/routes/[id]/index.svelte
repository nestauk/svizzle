<script>
	/* ext deps */

	// utils

	import {makeStyleVars} from '@svizzle/dom';
	import ColorBinsG from '@svizzle/legend/src/ColorBinsG.svelte';
	import ColorBinsDiv from '@svizzle/legend/src/ColorBinsDiv.svelte';
	import {
		makeKeyed,
		setIndexAsKey,
	} from '@svizzle/utils';
	import * as _ from 'lamb';
	import {onMount} from 'svelte';
	import {extent} from 'd3-array';

	/* local deps */

	// components

	import GeoFilterModal from 'components/GeoFilterModal.svelte';
	import Header from 'components/Header.svelte';
	import InfoModal from 'components/Info/InfoModal.svelte';
	import InfoView from 'components/Info/InfoView.svelte';
	import SettingsRow from 'components/SettingsRow.svelte';
	import SettingsView from 'components/SettingsView.svelte';
	import TrendsDiv from 'components/TrendsDiv.svelte';
	import TrendsG from 'components/TrendsG.svelte';

	// stores

	import {
		currentSchemeIndexStore,
		makeColorBinsStore,
		makeColorScaleStore,
	} from 'stores/colorScale';
	import {
		isSmallScreen,
		screenClasses,
	} from 'stores/layout';
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
	import {
		availableYearsStore,
		resetSelectedYear
	} from 'stores/selection';

	/* local utils */

	import sharedTheme from 'theme';
	import {makeGetIndicatorFormatOf} from 'utils/format';

	/* consts */

	const legendBarThickness = 40;
	const makeSetOrderWith = accessor => _.pipe([
		_.groupBy(_.getKey('year')),
		_.mapValuesWith(_.pipe([
			_.sortWith([_.sorterDesc(accessor)]),
			setIndexAsKey('order'),
		])),
		_.values,
		_.flatten,
	]);
	const makeKeyedTrue = makeKeyed(true);

	/* props */

	export let data;
	export let id;
	export let lookupStore;
	export let theme = sharedTheme;
	export let types;

	/* init */

	onMount(() => {
		setRoute('Id');
	});

	/* local vars */

	// bound
	let mediumTrendsHeight;
	let mediumTrendsWidth;

	// rest
	let useRankScale = false;

	/* reactive vars */

	// navigation
	$: $isSmallScreen && hideGeoModal();
	$: $isSmallScreen && hideInfoModal();
	$: id && showView('trends');
	$: id && resetSelectedYear();
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

	// update stores
	$: availableYearsStore.set(availableYears);

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: theme = theme ? {...sharedTheme, ...theme} : sharedTheme;

	// style
	$: style = makeStyleVars(theme);

	// utils
	$: getIndicatorFormat = makeGetIndicatorFormatOf(id);
	$: formatFn = getIndicatorFormat($lookupStore);
	$: getIndicatorValue = _.getKey(id);
	$: setOrder = makeSetOrderWith(getIndicatorValue);

	// selection
	$: selectedRegions = makeKeyedTrue($selectedNUT2IdsStore);
	$: preselectedRegions = makeKeyedTrue($preselectedNUTS2IdsStore);
	$: valueExtext = extent(filteredData, getIndicatorValue);
	$: rankedData = setOrder(data);
	$: filteredData = $doFilterRegionsStore
		? _.filter(rankedData, ({nuts_id}) =>
			_.has(selectedRegions, nuts_id) ||
			_.has(preselectedRegions, nuts_id)
		)
		: rankedData;
	$: trendsData = {
		filteredData,
		preselectedRegions,
		rankedData,
		selectedRegions,
		valueExtext,
		year_extent,
	}

	// layout
	$: mediumLegendHeight = mediumTrendsHeight / 3;

	// colors
	$: colorScale = $makeColorScaleStore(valueExtext);

	// legend
	$: makeColorBins = $makeColorBinsStore;
	$: colorBins = makeColorBins(colorScale);

	/* event handlers */

	const toggledColorScheme = ({detail}) => {
		currentSchemeIndexStore.set(detail === 'Red-Blue' ? 0 : 1)
	};
	const toggledFiltering = ({detail}) => {
		$doFilterRegionsStore = detail === 'Filter'
	};
	const toggledRanking = ({detail}) => {
		useRankScale = detail === 'Ranking'
	};
</script>

<!-- svelte-ignore component-name-lowercase -->

<div
	{style}
	class='time_region_value_IdIndex {$screenClasses}'
>
	<Header
		{subtitle}
		{title}
		on:click={toggleInfoModal}
	/>

	<div class='viewport {$viewsClasses}'>
		{#if $isSmallScreen}

			<!-- small -->

			<div class='view trends'>
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
					<TrendsDiv
						{colorScale}
						{formatFn}
						{getIndicatorValue}
						{schema}
						{theme}
						{types}
						{useRankScale}
						data={trendsData}
					/>
				</div>
			</div>
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
			<div class='view settings'>
				<SettingsView
					flags={{
						doFilter: $doFilterRegionsStore,
						showRankingControl: true,
					}}
					handlers={{
						toggledColorScheme,
						toggledFiltering,
						toggledRanking,
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
						showRankingControl: true
					}}
					handlers={{
						toggledColorScheme,
						toggledFiltering,
						toggledRanking,
						toggledGeoModal: toggleGeoModal,
					}}
					theme={_.pick(theme, ['colorBase', 'colorSelected'])}
				/>
			</div>

			<div
				{style}
				bind:clientHeight={mediumTrendsHeight}
				bind:clientWidth={mediumTrendsWidth}
				class='content'
			>
				{#if trendsData && mediumTrendsWidth && mediumTrendsHeight}
					<svg
						height={mediumTrendsHeight}
						width={mediumTrendsWidth}
					>
						<!-- trends -->

						<TrendsG
							{colorScale}
							{formatFn}
							{getIndicatorValue}
							{schema}
							{theme}
							{types}
							{useRankScale}
							data={trendsData}
							height={mediumTrendsHeight}
							width={mediumTrendsWidth}
						/>

						<!-- legend -->

						<g transform='translate(0,{mediumLegendHeight})'>
							<ColorBinsG
								width={legendBarThickness}
								height={mediumLegendHeight}
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
			</div>

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
					{is_public}
					{is_experimental}
					{query}
					{region}
					{source_name}
					{source_url}
					{theme}
					{url}
					{warning}
					{year_extent}
					on:click={toggleInfoModal}
				/>
			{/if}
		{/if}
	</div>
</div>

<style>
	.time_region_value_IdIndex {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: min-content 1fr;
		height: 100%;
		user-select: none;
		width: 100%;
	}

	.viewport {
		display: grid;
		grid-template-rows: 100%;
		height: 100%;
		position: relative;
	}

	/* small */

	.small .viewport {
		grid-template-areas: 'trends info settings';
		grid-template-columns: 33.333% 33.333% 33.333%;
		overflow-y: hidden; /* prevents svg charts from getting taller indefinitely */
		width: 300%;

		/* see the comment in the correspondent CSS in /[id]/[year] */
		/* transition:
			transform
			var(--transDuration)
			var(--transFunction); */
	}
	.small .viewport.trends {
		transform: translate(0%, 0px);
	}
	.small .viewport.info {
		transform: translate(-33.333%, 0px);
		padding: 1.5rem;
	}
	.small .viewport.settings {
		transform: translate(-66.666%, 0px);
	}

	.view {
		height: 100%;
		width: 100%;
		padding: 0 var(--dimPadding);
	}
	.view.trends {
		display: grid;
		grid-area: trends;
		grid-template-areas: 'topbox' 'content';
		grid-template-columns: 100%;
		grid-template-rows: 15% 85%;
	}
	.view.trends .topbox{
		grid-area: topbox;
	}
	.view.trends .content{
		grid-area: content;
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
	}

	.medium .viewport .topbox {
		grid-area: topbox;
	}
	.medium .viewport .content {
		grid-area: content;
	}
</style>
