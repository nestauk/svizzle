<script>
	import ScreenGauge from '@svizzle/ui/src/gauges/screen/ScreenGauge.svelte';
	import LoadingView from '@svizzle/ui/src/LoadingView.svelte';

	import Sidebar from '../lib/components/Sidebar.svelte';
	import Timeline from '../lib/components/Timeline.svelte';
	import ViewSelector from '../lib/components/ViewSelector.svelte';
	import {setGroups, setPOIs} from '../lib/stores/data';
	import {
		_isSmallScreen,
		_screenClasses,
		_timelineHeight,
		_timelineWidth,
	} from '../lib/stores/layout';
	import {
		_isTimelineHidden,
		_routes,
		_views,
		_viewsClasses,
		setHrefBase,
		setNavFlags,
		showView,
	} from '../lib/stores/navigation';
	import {setRegionSettings} from '../lib/stores/regionSelection';
	import {_availableYears, _selectedYear} from '../lib/stores/selection';
	import {_style, _theme, customizeTheme} from '../lib/stores/theme';
	import {isServerSide} from '../lib/utils/env';

	export let _groups = null;
	export let flags = null;
	export let hrefBase = '';
	export let POIs = null;
	export let regionSettings = null;
	export let segment = null;
	export let theme = null;

	$: _groups && setGroups($_groups);
	$: flags && setNavFlags(flags);
	$: hrefBase && setHrefBase(hrefBase);
	$: POIs && setPOIs(POIs);
	$: regionSettings && setRegionSettings(regionSettings);
	$: theme && customizeTheme(theme);
	$: routeId = $_isSmallScreen && $_routes.Id;
	$: routeIdYear = $_isSmallScreen && $_routes.IdYear;
</script>

<ScreenGauge/>

<!--
	A Svelte/Sapper issue with binding `$_timelineWidth` to `clientWidth` in a
	`div.content` below is causing it to miss resize events during load, hence
	the bound variable/store value is not updated.
	The workaround causes the following:
		a. Server-side: isServerSide === true so the markup is rendered for
			Sapper to scrape it during export.
		b. Client-side:
			1. Browser receives exported markup populating the DOM, but
			   `clientWidth`/`clientHeight` bindings don't update bound
			   variables (apparently a race condition).
			2. ($_screenClasses || isServerside) === false so the DOM is cleared
			3. After a while $_screenClasses is truthy so the DOM is repopulated
			   and now `clientWidth`/`clientHeight` bindings are properly
			   recreated and the bound variables/stores are properly updated.
	TODO Isolate the cause of the bug.
-->
{#if $_screenClasses || isServerSide}
	<section
		class='time_region_value_layout {$_screenClasses}'
		class:hidden={!$_screenClasses}
		style={$_style}
	>
		<div
			class:routeId
			class:routeIdYear
			class='viewport {$_viewsClasses}'
		>
			<div class='sidebar'>
				<Sidebar
					{_groups}
					currentId={segment}
				/>
			</div>
			<div
				class='content'
				class:isTimelineHidden={$_isTimelineHidden}
				bind:clientWidth={$_timelineWidth}
			>
				<section>
					<slot></slot>
				</section>
				{#if !$_isTimelineHidden}
					<nav
						bind:clientHeight={$_timelineHeight}
					>
						<Timeline
							availableYears={$_availableYears}
							height={$_timelineHeight}
							indicatorId={segment}
							selectedYear={$_selectedYear}
							showLess={$_isSmallScreen}
							width={$_timelineWidth}
						/>
					</nav>
				{/if}
			</div>
		</div>

		{#if $_isSmallScreen}
			<ViewSelector
				{_routes}
				{_views}
				{showView}
			/>
		{/if}
	</section>
{/if}

{#if !$_screenClasses}
	<LoadingView stroke={$_theme.colorMain}/>
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
	.hidden {
		display: none !important;
	}
</style>
