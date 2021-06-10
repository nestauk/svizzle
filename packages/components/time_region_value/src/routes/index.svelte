<script>
	import * as _ from 'lamb';
	import {onMount} from 'svelte';

	/* local stores */

	import {_isSmallScreen, _timelineLayout} from 'stores/layout';
	import {setRoute, showView} from 'stores/navigation';
	import {resetSelection} from 'stores/selection';
	import {_style} from 'stores/theme';
	import {shortenYear} from 'utils/format';
	import {makeURL} from 'utils/url';

	/* consts */

	const gap = 7;

	/* props */

	// sapper
	export let isSapperExported = null; // pass `process.env.SAPPER_EXPORT`

	// rest
	export let _groups = null;
	export let _yearRange = null;
	export let hrefBase = ''; // relative to `document.baseURI`

	/* init */

	onMount(() => {
		resetSelection();
		setRoute('Index');
		showView('distribution');
	});

	/* local vars */

	// bound
	// when exporting, to crawl links in the svg, we need to have width defined
	let width = isSapperExported && 1000;
	let height;

	$: layout = $_timelineLayout;
	$: vStep = 2 * layout.radius + 3 * gap + layout.fontSize;
	$: shortenYearFn = $_isSmallScreen ? shortenYear : _.identity;
</script>

<div
	class='time_region_value_Index'
	style={$_style}
>
	<header>
		<h1>Indicators</h1>
	</header>

	<div
		class='timedist'
		bind:clientHeight={height}
		bind:clientWidth={width}
	>
		<ul>
			{#each $_groups as {description, indicators, label}}
				<div class='group'>
					<h2>{label}</h2>
					<p>{description}</p>

					{#if width}
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
											rel='prefetch'
											href={makeURL(hrefBase, schema.value.id, year)}
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
				</div>
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

	ul {
		line-height: 1.5;
	}

	.group {
		margin-top: 1rem;
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
