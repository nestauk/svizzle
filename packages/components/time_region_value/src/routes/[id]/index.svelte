<script>
	/* ext deps */

	// utils

	import ColorBinsG from '@svizzle/legend/src/ColorBinsG.svelte';
	import ColorBinsDiv from '@svizzle/legend/src/ColorBinsDiv.svelte';
	import MessageView from '@svizzle/ui/src/MessageView.svelte';
	import {
		makeKeyed,
		setIndexAsKey,
	} from '@svizzle/utils';
	import * as _ from 'lamb';
	import {onMount} from 'svelte';
	import {extent} from 'd3-array';

	/* local deps */

	// components

	import GeoFilterModal from '../../lib/components/GeoFilterModal.svelte';
	import Header from '../../lib/components/Header.svelte';
	import InfoModal from '../../lib/components/Info/InfoModal.svelte';
	import InfoView from '../../lib/components/Info/InfoView.svelte';
	import SettingsRow from '../../lib/components/SettingsRow.svelte';
	import SettingsView from '../../lib/components/SettingsView.svelte';
	import TrendsDiv from '../../lib/components/TrendsDiv.svelte';
	import TrendsG from '../../lib/components/TrendsG.svelte';

	// stores

	import {_isSmallScreen, _screenClasses} from '../../lib/stores/layout';
	import {
		_doFilterRegions,
		_geoModal,
		_infoModal,
		hideGeoModal,
		hideInfoModal,
		toggleGeoModal,
		toggleInfoModal,
	} from '../../lib/stores/modals';
	import {
		_viewsClasses,
		setRoute,
		showView,
	} from '../../lib/stores/navigation';
	import {
		_preselectedNUTS2Ids,
		_selectedNUT2Ids,
		_someUnselectedRegions,
	} from '../../lib/stores/regionSelection';
	import {_availableYears, resetSelectedYear} from '../../lib/stores/selection';
	import {
		_theme,
		_makeColorScale,
		_makeColorBins,
	} from '../../lib/stores/theme';

	/* local utils */

	import config from '../../lib/config';
	import {makeGetIndicatorFormatOf} from '../../lib/utils/format';

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

	export let _lookup = null;
	export let data = null;
	export let id = null;
	export let types = null;

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
	$: $_isSmallScreen && hideGeoModal();
	$: $_isSmallScreen && hideInfoModal();
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
	} = $_lookup[id] || {});

	// update stores
	$: _availableYears.set(availableYears);

	// utils
	$: getIndicatorFormat = makeGetIndicatorFormatOf(id);
	$: formatFn = getIndicatorFormat($_lookup);
	$: getIndicatorValue = _.getKey(id);
	$: setOrder = makeSetOrderWith(getIndicatorValue);

	// selection
	$: selectedRegions = makeKeyedTrue($_selectedNUT2Ids);
	$: preselectedRegions = makeKeyedTrue($_preselectedNUTS2Ids);
	$: valueExtext = extent(filteredData, getIndicatorValue);
	$: rankedData = setOrder(data);
	$: filteredData = $_doFilterRegions
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
	$: noData = filteredData.length === 0;

	// layout
	$: mediumLegendHeight = mediumTrendsHeight / 3;

	// colors
	$: colorScale = $_makeColorScale(valueExtext);

	// legend
	$: colorBins = $_makeColorBins(colorScale);

	/* event handlers */

	const toggledFiltering = ({detail}) => {
		$_doFilterRegions = detail === 'Filter'
	};
	const toggledRanking = ({detail}) => {
		useRankScale = detail === 'Ranking'
	};
</script>

<!-- svelte-ignore component-name-lowercase -->

<div class='time_region_value_IdIndex {$_screenClasses}'>
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

			<!-- trends -->

			<div
				class:noData
				class='view trends'
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
						<TrendsDiv
							{colorScale}
							{formatFn}
							{getIndicatorValue}
							{schema}
							{types}
							{useRankScale}
							data={trendsData}
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
						showRankingControl: true,
					}}
					handlers={{
						toggledFiltering,
						toggledRanking,
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
						showRankingControl: true,
						someUnselectedRegions: $_someUnselectedRegions,
					}}
					handlers={{
						toggledFiltering,
						toggledRanking,
						toggledGeoModal: toggleGeoModal,
					}}
				/>
			</div>

			<!-- content -->

			<div
				bind:clientHeight={mediumTrendsHeight}
				bind:clientWidth={mediumTrendsWidth}
				class:noData
				class='content'
			>
				{#if noData}
					<MessageView text='No data' />
				{:else if trendsData && mediumTrendsWidth && mediumTrendsHeight}
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
									backgroundColor: $_theme.colorWhite,
									backgroundOpacity: 0.5,
								}}
								ticksFormatFn={formatFn}
							/>
						</g>

					</svg>
				{/if}
			</div>

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
					{is_public}
					{is_experimental}
					{query}
					{region}
					{source_name}
					{source_url}
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

	.view.noData {
		display: block !important;
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
	.medium .viewport .content.noData {
		display: block;
	}
</style>
