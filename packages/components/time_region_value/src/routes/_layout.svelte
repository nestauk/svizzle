<script>
	import * as _ from 'lamb';
	import {makeStyleVars} from '@svizzle/dom';
	import ScreenGauge from '@svizzle/ui/src/gauges/screen/ScreenGauge.svelte';
	import LoadingView from '@svizzle/ui/src/LoadingView.svelte';

	import Sidebar from 'components/Sidebar.svelte';
	import Timeline from 'components/Timeline.svelte';
	import ViewSelector from 'components/ViewSelector.svelte';
	import sharedTheme from 'theme';
	import {setGroupsStore} from 'stores/data';
	import {
		isSmallScreen,
		screenClasses,
		timelineHeightStore,
		timelineWidthStore,
	} from 'stores/layout';
	import {
		isTimelineHidden,
		routes,
		showView,
		views,
		viewsClasses,
	} from 'stores/navigation';
	import {availableYearsStore, selectedYearStore} from 'stores/selection';

	export let goTo = null;
	export let groupsStore = null;
	export let hrefBase = '';
	export let segment = null;
	export let theme = sharedTheme;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: theme = theme ? {...sharedTheme, ...theme} : sharedTheme;

	$: style = makeStyleVars(theme);
	$: groupsStore && setGroupsStore($groupsStore);
	$: routeId = $isSmallScreen && $routes.Id;
	$: routeIdYear = $isSmallScreen && $routes.IdYear;
</script>

<ScreenGauge/>

{#if $screenClasses}
	<section
		{style}
		class='time_region_value_layout {$screenClasses}'
	>
		<div
			class:routeId
			class:routeIdYear
			class='viewport {$viewsClasses}'
		>
			<div class='sidebar'>
				<Sidebar
					{groupsStore}
					{hrefBase}
					theme={sharedTheme}
					currentId={segment}
				/>
			</div>
			<div
				class='content'
				class:isTimelineHidden={$isTimelineHidden}
				bind:clientWidth={$timelineWidthStore}
			>
				<section>
					<slot></slot>
				</section>
				{#if !$isTimelineHidden}
					<nav
						bind:clientHeight={$timelineHeightStore}
					>
						<Timeline
							{goTo}
							{hrefBase}
							availableYears={$availableYearsStore}
							height={$timelineHeightStore}
							indicatorId={segment}
							selectedYear={$selectedYearStore}
							showLess={$isSmallScreen}
							width={$timelineWidthStore}
						/>
					</nav>
				{/if}
			</div>
		</div>

		{#if $isSmallScreen}
			<ViewSelector
				{routes}
				{showView}
				{views}
				theme={_.pickIn(sharedTheme, ['dimBoxShadowY', 'colorBoxShadow'])}
			/>
		{/if}
	</section>
{:else}
	<LoadingView stroke={theme.colorMain}/>
{/if}

<style>
	.time_region_value_layout {
		background-color: var(--colorWhite);
		display: grid;
		grid-template-columns: 100%;
		height: 100%;
		overflow: hidden;
		width: 100%;
	}
	.small.time_region_value_layout {
		grid-template-rows:
			calc(100% - var(--dimSmallSelectorHeight))
			var(--dimSmallSelectorHeight);
	}
	.medium.time_region_value_layout {
		grid-template-rows: 100%;
	}

	/* viewport */

	.viewport {
		display: grid;
		grid-template-rows: 100%;
		height: 100%;
		width: 100%;
	}
	.small .viewport {
		transition:
			transform
			var(--transDuration)
			var(--transFunction);
		grid-template-columns: 50% 50%;
		width: 200%;
	}
	.small .viewport.sidebar {
		transform: translate(0%, 0px);
	}
	.small .viewport.distribution,
	.small .viewport.trends,
	.small .viewport.map,
	.small .viewport.barchart,
	.small .viewport.settings,
	.small .viewport.info {
		transform: translate(-50%, 0px);
	}

	.medium .viewport,
	.medium .viewport.sidebar,
	.medium .viewport.distribution,
	.medium .viewport.trends,
	.medium .viewport.map,
	.medium .viewport.barchart,
	.medium .viewport.settings,
	.medium .viewport.info {
		grid-template-columns:
			var(--dimSidebarWidth)
			calc(100% - var(--dimSidebarWidth));
		transform: translate(0%, 0px);
		transition: null;
		width: 100%;
	}

	/* sidebar */

	.sidebar {
		height: 100%;
		width: 100%;
	}

	/* content */

	.content {
		--dimTimelineHeight: 60px;
		display: grid;
		grid-template-columns: 100%;
		height: 100%;
		width: 100%;
	}
	.content {
		grid-template-areas: 'slot' 'nav';
		grid-template-rows:
			calc(100% - var(--dimTimelineHeight))
			var(--dimTimelineHeight);
	}
	.content section {
		grid-area: slot;
		height: 100%;
		width: 100%;
	}
	.content nav {
		background-color: var(--colorNav) !important;
		grid-area: nav;
		height: 100%;
		padding: 0 var(--dimPadding);
		width: 100%;
	}
	.content.isTimelineHidden {
		grid-template-areas: 'slot';
		grid-template-rows: 100%;
	}
</style>
