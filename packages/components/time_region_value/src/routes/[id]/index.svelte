<script>
	/* ext deps */

	// utils

	import ColorBinsG from '@svizzle/legend/src/ColorBinsG.svelte';
	import ColorBinsDiv from '@svizzle/legend/src/ColorBinsDiv.svelte';
	import MessageView from '@svizzle/ui/src/MessageView.svelte';
	import {onMount} from 'svelte';

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

	import {_colorScale} from 'stores/colors';
	import {_lookup} from 'stores/dataset';
	import {
		_formatFn,
		_getIndicatorValue,
		_indicator,
		_rankedData,
		_selectionData,
	} from 'stores/indicator';
	import {_currentExtext, _isCurrentDataEmpty} from 'stores/indicatorCurrent';
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
		_viewsClasses,
		setRoute,
		showView,
	} from 'stores/navigation';
	import {
		_doFilterRegions,
		_isRegionsSelectionDirty,
		setCurrentLevel,
	} from 'stores/selectedRegions';
	import {resetSelectedYear} from 'stores/selectedYear';
	import {_theme} from 'stores/theme';

	/* local utils */

	import config from 'config';

	/* consts */

	const legendBarThickness = 40;

	/* props */

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
	$: id && data && _indicator.set({data, id});
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

	// selection
	$: trendsData = {
		rankedData: $_rankedData,
		selectionData: $_selectionData,
		valueExtext: $_currentExtext,
		year_extent,
	}

	// layout
	$: mediumLegendHeight = mediumTrendsHeight / 3;

	/* event handlers */

	const setLevel = ({detail: level}) => setCurrentLevel(level);
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
		class:noData={$_isCurrentDataEmpty}
		class='viewport {$_viewsClasses}'
	>
		{#if $_isSmallScreen}

			<!-- small -->

			<!-- trends -->

			<div
				class:noData={$_isCurrentDataEmpty}
				class='view trends'
			>
				{#if $_isCurrentDataEmpty}
					<MessageView text={config.noDataMessage} />
				{:else}
					<div class='topbox'>
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
					</div>
					<div class='content'>
						<TrendsDiv
							{schema}
							{types}
							{useRankScale}
							colorScale={$_colorScale}
							data={trendsData}
							formatFn={$_formatFn}
							getIndicatorValue={$_getIndicatorValue}
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
						showRankingControl: true,
					}}
					handlers={{
						setLevel,
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
						isRegionsSelectionDirty: $_isRegionsSelectionDirty,
						showRankingControl: true,
					}}
					handlers={{
						setLevel,
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
				class:noData={$_isCurrentDataEmpty}
				class='content'
			>
				{#if $_isCurrentDataEmpty}
					<MessageView text={config.noDataMessage} />
				{:else if trendsData && mediumTrendsWidth && mediumTrendsHeight}
					<svg
						height={mediumTrendsHeight}
						width={mediumTrendsWidth}
					>
						<!-- trends -->

						<TrendsG
							{schema}
							{types}
							{useRankScale}
							colorScale={$_colorScale}
							data={trendsData}
							formatFn={$_formatFn}
							getIndicatorValue={$_getIndicatorValue}
							height={mediumTrendsHeight}
							width={mediumTrendsWidth}
						/>

						<!-- legend -->

						{#if $_colorBins}
							<g transform='translate(0,{mediumLegendHeight})'>
								<ColorBinsG
									bins={$_colorBins}
									flags={{
										isVertical: true,
										withBackground: true,
									}}
									height={mediumLegendHeight}
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
				{/if}	<!-- noData  -->

				<!-- geo modal -->

				{#if $_geoModal.isVisible}
					<GeoFilterModal on:click={toggleGeoModal} />
				{/if}

			</div> <!-- .content -->

			<!-- info modal -->

			{#if $_infoModal.isVisible}
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
					{region_types}
					{source_name}
					{source_url}
					{url}
					{warning}
					{year_extent}
					on:click={toggleInfoModal}
				/>
			{/if}

		{/if}	<!-- medium + -->
	</div>
</div>

<style>
	.time_region_value_IdIndex {
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
		position: relative;	/* geo modal */
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
