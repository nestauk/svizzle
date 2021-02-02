<script>
	import {resetSafetyStore, timelineLayoutStore} from 'stores/layout';
	import {resetSelection} from 'stores/selection';

	const gap = 7;

	// sapper
	export let goTo = null; // pass `@sapper/app`'s `goto`
	export let isSapperExported = null; // pass `process.env.SAPPER_EXPORT`

	// rest
	export let groupsStore;
	export let hrefBase = '';
	export let yearRangeStore;

	resetSelection();
	resetSafetyStore();

	// when exporting, to crawl links in the svg, we need to have width defined
	let width = isSapperExported && 1000; // bound
	let height; // bound

	$: layout = $timelineLayoutStore;
	$: vStep = 2 * layout.radius + 3 * gap + layout.fontSize;
</script>

<div class="container">
	<header>
		<h1>Indicators</h1>
	</header>

	<div
		class="timedist"
		bind:clientHeight={height}
		bind:clientWidth={width}
	>
		<ul>
			{#each $groupsStore as {description, indicators, label}}
			<div class="group">
				<h2>{label}</h2>
				<p>{description}</p>

				{#if width}
				<svg
					{width}
					height='{4 * gap + layout.fontSize + vStep * indicators.length}'
				>
					<!-- global years range -->

					{#each $yearRangeStore as year}
						<g
							class='xref'
							transform='translate({layout.scaleX(year)},0)'
						>
							<line
								y1='{gap}'
								y2='{gap + vStep * indicators.length}'
							/>
							<text
								font-size={layout.fontSize}
								y='{2 * gap + vStep * indicators.length + layout.fontSize / 2}'
							> {year}
							</text>
						</g>
					{/each}

					<!-- indicators -->

					{#each indicators as {availableYears, title, schema, year_extent}, y}
					<g
						class='indicatorsrange'
						transform='translate(0,{vStep * (y + 1)})'
					>
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
						<line
							x1='{layout.scaleX(year_extent[0]) + layout.radius}'
							x2='{layout.scaleX(year_extent[1]) - layout.radius}'
						/>
						{#each availableYears as year}
							{#if goTo}
								<circle
									cx='{layout.scaleX(year)}'
									r={layout.radius}
									on:click='{() => goTo(`${hrefBase}/${schema.value.id}/${year}`)}'
								/>
							{:else}
								<a
									rel='prefetch'
									href='{hrefBase}/{schema.value.id}/{year}'
								>
									<circle
										cx='{layout.scaleX(year)}'
										r={layout.radius}
									/>
								</a>
							{/if}
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
	.container {
		--indicators-h1-height: 2rem;
		height: 100%;
		width: 100%;
	}

	.container header {
		height: var(--indicators-h1-height);
	}

	.container .timedist {
		height: calc(100% - var(--indicators-h1-height));
		width: 100%;
		overflow-y: auto;
	}

	ul {
		line-height: 1.5;
	}

	/* a {
		text-decoration: none;
	} */

	.group {
		margin-top: 1rem;
	}

	svg .xref line {
		stroke: grey;
		stroke-dasharray: 2 2;
	}

	svg .xref text {
		stroke: none;
		fill: grey;
		dominant-baseline: hanging;
		text-anchor: middle;
		font-size: 10px;
		/* cursor: pointer; */
	}

	svg .indicatorsrange line {
		stroke: black;
		stroke-width: 0.7;
		pointer-events: none;
	}

	svg .indicatorsrange text {
		stroke: none;
		fill: rgb(70, 70, 70);
		dominant-baseline: middle;
		text-anchor: middle;
		pointer-events: none;
	}
	svg .indicatorsrange text.bkg {
		stroke: white;
		stroke-width: 5;
	}

	svg .indicatorsrange circle {
		fill-opacity: 1;
		fill: white;
		stroke: black;
		stroke-width: 1.5;
		cursor: pointer;
	}
</style>
