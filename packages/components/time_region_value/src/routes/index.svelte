<script>
	import {isServerSide} from '@svizzle/ui';
	import * as _ from 'lamb';
	import {onMount} from 'svelte';

	// lib/stores
	import {_isSmallScreen, _timelineLayout} from '../lib/stores/layout.js';
	import {_hrefBase, setRoute, showView} from '../lib/stores/navigation.js';
	import {resetSelectedYear} from '../lib/stores/selectedYear.js';

	// lib/utils
	import {shortenYear} from '../lib/utils/format.js';
	import {makeURL} from '../lib/utils/url.js';

	/* consts */

	const gap = 7;

	/* props */

	export let _groups = null;
	export let _yearRange = null;

	/* init */

	onMount(() => {
		resetSelectedYear();
		setRoute('Index');
		showView('distribution');
	});

	/* local vars */

	// bound
	let width;

	$: layout = $_timelineLayout;
	$: vStep = 2 * layout.radius + 3 * gap + layout.fontSize;
	$: shortenYearFn = $_isSmallScreen ? shortenYear : _.identity;
</script>

<div class='time_region_value_Index'>
	<header>
		<h1>Indicators</h1>
	</header>

	<div
		class='timedist'
		bind:clientWidth={width}
	>
		<ul>
			{#each $_groups as {description, indicators, label}}
				<li class='group'>
					<h2>{label}</h2>
					<p>{description}</p>

					{#if width || isServerSide}
						<svg
							{width}
							height='{4 * gap + layout.fontSize + vStep * indicators.length}'
						>
							<!-- axis -->

							{#each $_yearRange as year}
								<g
									class='xref'
									transform='translate({layout.scaleX(year)},0)'
								>
									<!-- line -->
									{#if indicators.length > 1}
										<line
											y1='{gap}'
											y2='{gap + vStep * indicators.length}'
										/>
									{/if}

									<!-- year -->
									<text
										font-size={layout.fontSize}
										y='{2 * gap + vStep * indicators.length + layout.fontSize / 2}'
									>{shortenYearFn(year)}
									</text>
								</g>
							{/each}

							<!-- indicators -->

							{#each indicators as {availableYears, title, schema, year_extent}, y}
								<g
									class='indicatorsrange'
									transform='translate(0,{vStep * (y + 1)})'
								>
									<!-- title -->
									<text
										class='bkg'
										x='{(layout.scaleX(year_extent[0]) + layout.scaleX(year_extent[1])) / 2}'
										dy='{-(layout.fontSize + gap)}'
										font-size={layout.fontSize}
									>{title}</text>
									<text
										x='{(layout.scaleX(year_extent[0]) + layout.scaleX(year_extent[1])) / 2}'
										dy='{-(layout.fontSize + gap)}'
										font-size={layout.fontSize}
									>{title}</text>

									<!-- joining line -->
									<line
										x1='{layout.scaleX(year_extent[0]) + layout.radius}'
										x2='{layout.scaleX(year_extent[1]) - layout.radius}'
									/>

									<!-- dots -->
									{#each availableYears as year}
										<a
											aria-label={year}
											href={makeURL($_hrefBase, schema.value.id, year)}
											rel='prefetch'
										>
											<circle
												cx='{layout.scaleX(year)}'
												r={layout.radius}
											/>
										</a>
									{/each}
								</g>
							{/each}
						</svg>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

</div>

<style>
	.time_region_value_Index {
		height: 100%;
		width: 100%;
		padding: var(--dimPadding) var(--dimPadding) 0 var(--dimPadding);
	}

	.time_region_value_Index header {
		height: var(--dimHeaderHeightShort);
	}

	.time_region_value_Index .timedist {
		height: calc(100% - var(--dimHeaderHeightShort));
		width: 100%;
		overflow-y: auto;
	}

	.group {
		margin-top: 1rem;
	}

	svg {
		display: block;
	}

	svg .xref line {
		stroke: var(--colorLightgrey);
		stroke-dasharray: 2 2;
	}

	svg .xref text {
		stroke: none;
		fill: var(--colorRef);
		dominant-baseline: hanging;
		text-anchor: middle;
		font-size: 10px;
		/* cursor: pointer; */
	}

	svg .indicatorsrange line {
		stroke: var(--colorBlack);
		stroke-width: 0.7;
		pointer-events: none;
	}

	svg .indicatorsrange text {
		stroke: none;
		fill: var(--colorRef);
		dominant-baseline: middle;
		text-anchor: middle;
		pointer-events: none;
	}
	svg .indicatorsrange text.bkg {
		stroke: var(--colorWhite);
		stroke-width: 5;
	}

	svg .indicatorsrange circle {
		fill-opacity: 1;
		fill: var(--colorWhite);
		stroke: var(--colorBlack);
		stroke-width: 1.5;
		cursor: pointer;
	}
</style>
