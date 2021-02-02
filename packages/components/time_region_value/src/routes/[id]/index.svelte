<script>
	/* ext deps */

	// utils

	import * as _ from 'lamb';
	import {writable} from 'svelte/store';
	import {extent, max} from 'd3-array';
	import {quadtree} from 'd3-quadtree';
	import {scaleLinear} from 'd3-scale';
	import {line, curveMonotoneX} from 'd3-shape';
	import {
		applyFnMap,
		isIterableNotEmpty,
		makeKeyed,
		mergeObj,
		objectToKeyValueArray,
		setIndexAsKey,
		transformValues,
	} from '@svizzle/utils';

	// components

	import ColorBinsG from '@svizzle/legend/src/ColorBinsG.svelte';
	import IconChevronDown from '@svizzle/ui/src/icons/IconChevronDown.svelte';
	import IconChevronUp from '@svizzle/ui/src/icons/IconChevronUp.svelte';
	import IconGlobe from '@svizzle/ui/src/icons/IconGlobe.svelte';
	import IconInfo from '@svizzle/ui/src/icons/IconInfo.svelte';
	import Switch from '@svizzle/ui/src/Switch.svelte';

	/* local components */

	import InfoModal from 'components/InfoModal/InfoModal.svelte';
	import GeoFilterModal from 'components/GeoFilterModal.svelte';

	/* local stores */

	import {
		currentSchemeIndexStore,
		makeColorBinsStore,
		makeColorScaleStore,
	} from 'stores/colorScale';
	import {timelineLayoutStore} from 'stores/layout';
	import {
		doFilterRegionsStore,
		geoModalStore,
		hideInfoModal,
		infoModalStore,
		toggleGeoModal,
		toggleInfoModal,
	} from 'stores/modals';
	import {
		areThereUnselectedNUTS1Regions,
		nutsSelectionStore,
		preselectedNUTS2IdsStore,
		selectedNUT2IdsStore,
	} from 'stores/regionSelection';
	import {
		availableYearsStore,
		resetSelectedYear
	} from 'stores/selection';

	/* local utils  */

	import {getNutsId, sortAscByYear} from 'utils/domain';
	import {makeGetIndicatorFormatOf} from 'utils/format';
	import {makeValueAccessor} from 'utils/generic';
	import {colorSelected} from 'shared/colors';

	/* data */

	import yearlyKeyToLabel from 'data/NUTS2_UK_labels';
	// TODO
	// import yearlyKeyToLabel from '@svizzle/atlas/NUTS2_UK_labels';

	/* consts */

	const makeSetOrderWith = accessor => _.pipe([
		_.groupBy(_.getKey('year')),
		_.mapValuesWith(_.pipe([
			_.sortWith([_.sorterDesc(accessor)]),
			setIndexAsKey('order'),
		])),
		_.values,
		_.flatten,
	]);
	const makeTrends = _.pipe([
		_.groupBy(getNutsId),
		_.mapValuesWith(sortAscByYear),
		objectToKeyValueArray
	]);
	const getOrder = _.getKey('order');
	const makeKeyedTrue = makeKeyed(true);

	const gap = 4;
	const labelFontSize = 14;
	const axisFontSize = 12;
	const tooltipFontSize = 10;
	const tooltipPadding = 5;
	const tooltipShift = 1.5 * tooltipPadding + 0.5 * tooltipFontSize;
	const legendBarThickness = 40;

	/* props */

	export let data;
	export let id;
	export let lookupStore;
	export let types;

	/* vars */

	let height;
	let highlightedKey;
	let width;
	let useOrderScale = false;

	/* reactive vars */

	$: id && resetSelectedYear();
	$: id && hideInfoModal();

	$: ({
		api_doc_url,
		api_type,
		auth_provider,
		availableYears,
		data_date,
		description,
		endpoint_url,
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

	$: legendHeight = height / 3;
	$: makeColorScale = $makeColorScaleStore;
	$: makeColorBins = $makeColorBinsStore;
	$: getIndicatorFormat = makeGetIndicatorFormatOf(id);
	$: formatFn = getIndicatorFormat($lookupStore);
	$: $availableYearsStore = availableYears;
	$: layout = $timelineLayoutStore;
	$: getIndicatorValue = makeValueAccessor(id);
	$: setOrder = makeSetOrderWith(getIndicatorValue);
	$: selectedRegionsObj = makeKeyedTrue($selectedNUT2IdsStore);
	$: preselectedRegionsObj = makeKeyedTrue($preselectedNUTS2IdsStore);
	$: rankedData = setOrder(data);
	$: filteredData = $doFilterRegionsStore
		? _.filter(rankedData, ({nuts_id}) =>
			_.has(selectedRegionsObj, nuts_id) || _.has(preselectedRegionsObj, nuts_id)
		)
		: rankedData;
	$: valueExtext = extent(filteredData, getIndicatorValue);
	$: maxOrder = max(rankedData, getOrder);
	$: trends = makeTrends(filteredData);
	$: taggedTrends = _.map(trends, item => ({
		...item,
		preselected: _.has(preselectedRegionsObj, item.key),
		selected: _.has(selectedRegionsObj, item.key),
	}));
	$: radius = Math.min(layout.radius, 0.5 * (height / maxOrder) - gap);
	$: yMin = radius + 2 * gap + labelFontSize;
	$: yMax = height - Math.max(radius, axisFontSize / 2) - gap;
	$: yLabel = gap + labelFontSize / 2;
	$: labelUnit =
		schema.value.unit_string ||
		schema.value.type &&
		_.has(types, schema.value.type) &&
		_.has(types[schema.value.type], 'unit_string') &&
		types[schema.value.type].unit_string;
	$: scaleY = useOrderScale
		? scaleLinear().domain([0, maxOrder]).range([yMin, yMax])
		: scaleLinear().domain(valueExtext).range([yMax, yMin]);
	$: ticks = scaleY && scaleY.ticks().map(value => ({
		label: useOrderScale ? value + 1 : formatFn(value),
		y: scaleY(value)
	}));
	$: getX = d => layout.scaleX(d.year);
	$: getY = d => useOrderScale ? scaleY(d.order) : scaleY(getIndicatorValue(d));
	$: lineGenerator =
		line()
		.x(getX)
		.y(getY)
		.curve(curveMonotoneX);
	$: trendLines = _.map(taggedTrends, transformValues({value: lineGenerator}));
	$: colorScale = makeColorScale(valueExtext);
	$: getStopOffset = d => `${100 * layout.scaleX(d.year) / width}%`;
	$: gradients = _.map(taggedTrends, transformValues({
		value: _.mapWith(applyFnMap({
			offset: getStopOffset,
			stopColor: _.pipe([getIndicatorValue, colorScale])
		}))
	}));

	$: X1 = layout.fullScaleX(year_extent[0]);
	$: X2 = layout.fullScaleX(year_extent[1]);
	$: x1 = layout.scaleX(year_extent[0]);
	$: x2 = layout.scaleX(year_extent[1]);
	$: xMed = (x1 + x2) / 2;

	$: chartTitle = `${useOrderScale ? 'Ranking by' : ''} ${schema.value.label}`;

	// legend
	$: colorBins = makeColorBins(colorScale);

	/* tooltip */

	$: quadTree = isIterableNotEmpty(filteredData) &&
		quadtree()
		.x(getX)
		.y(getY)
		.addAll(filteredData)
		.extent([[x1, 0],[x2, height]]);

	const tooltipDefault = {isVisible: false};
	const tooltip = writable(tooltipDefault);

	const onMouseMove = event => {
		const {offsetX, offsetY} = event;

		if (offsetX < x1 || offsetX > x2 || !quadTree) {
			tooltip.set(tooltipDefault);
			return;
		}

		const datum = quadTree.find(offsetX, offsetY);
		const {nuts_id, nuts_year_spec} = datum;

		highlightedKey = nuts_id;
		const keyToLabel = yearlyKeyToLabel[nuts_year_spec];
		const dotX = getX(datum);
		const dotY = getY(datum);
		const isRight = dotX > (X1 + X2) / 2;
		const shiftX = isRight ? -tooltipShift : tooltipShift;
		const shiftY =
			Math.max(yMin + tooltipShift, Math.min(dotY, yMax - tooltipShift)) - dotY;

		tooltip.update(mergeObj({
			isVisible: true,
			...datum,
			nuts_label: `${keyToLabel[nuts_id]} (${nuts_id})`,
			value: formatFn(getIndicatorValue(datum)),
			dotX,
			dotY,
			isRight,
			shiftX,
			shiftY,
		}));
	}

	const onMouseLeave = () => {
		tooltip.set(tooltipDefault);
	}
</script>

<!-- svelte-ignore component-name-lowercase -->

<div class='container'>
	<header>
		<div>
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</div>
		<div on:click={toggleInfoModal}>
			<IconInfo
				size={30}
				strokeWidth={1.5}
			/>
		</div>
	</header>

	<section>
		<div class='controls'>
			<div class='optgroup'>
				<div
					class='globe clickable'
					on:click={toggleGeoModal}
				>
					<IconGlobe
						strokeWidth={1.5}
						stroke={$areThereUnselectedNUTS1Regions ? colorSelected : 'black'}
						size={28}
					/>
					{#if $geoModalStore.isVisible}
					<IconChevronUp strokeWidth={1} size={24} />
					{:else}
					<IconChevronDown strokeWidth={1} size={24} />
					{/if}
				</div>

				<Switch
					value={$doFilterRegionsStore ? 'Filter' : 'Highlight'}
					values={['Highlight', 'Filter']}
					on:toggled={event => {
						$doFilterRegionsStore = event.detail === 'Filter'
					}}
				/>
			</div>

			<div class='optgroup'>
				<Switch
					value={'Absolute'}
					values={['Absolute', 'Ranking']}
					on:toggled={event => {
						useOrderScale = event.detail === 'Ranking'
					}}
				/>
			</div>

			<div class='optgroup'>
				<Switch
					value={$currentSchemeIndexStore ? 'Green-Blue' : 'Red-Blue'}
					values={['Red-Blue', 'Green-Blue']}
					on:toggled={event => {
						$currentSchemeIndexStore = event.detail === 'Red-Blue' ? 0 : 1
					}}
				/>
			</div>
		</div>

		<div
			class='trends'
			bind:clientHeight={height}
			bind:clientWidth={width}
			on:mousemove={onMouseMove}
			on:mouseleave={onMouseLeave}
		>
			{#if width && height}
				<svg
					{width}
					{height}
				>
					{#if trends.length}
						<defs>
							{#each gradients as {key, value}}
								<linearGradient
									id={key}
									gradientUnits='userSpaceOnUse'
								>
									{#each value as {offset, stopColor}}
										<stop {offset} stop-color={stopColor} />
									{/each}
								</linearGradient>
							{/each}
						</defs>

						<!-- axes -->
						<g>
							<text
								class='label'
								x='{xMed}'
								y={yLabel}
								font-size={labelFontSize}
							>
								<tspan>{chartTitle}</tspan>
								{#if labelUnit}<tspan>[{labelUnit}]</tspan>{/if}
							</text>
							<g class='ref x'>
								{#each $availableYearsStore as year}
									<line
										x1={layout.scaleX(year)}
										x2={layout.scaleX(year)}
										y1={yMin}
										y2={yMax}
									/>
								{/each}
							</g>
							<g
								class='ref left'
								transform='translate({x1},0)'
							>
								{#each ticks as {label, y}}
									<line x2='-10' y1={y} y2={y}/>
									<text dx='-15' dy={y} font-size={axisFontSize}>{label}</text>
								{/each}
							</g>
							<g
								class='ref right'
								transform='translate({x2},0)'
							>
								{#each ticks as {label, y}}
									<line x2='10' y1={y} y2={y}/>
									<text dx='15' dy={y} font-size={axisFontSize}>{label}</text>
								{/each}
							</g>
						</g>

						<!-- curves -->
						<g>
							{#each trendLines as {key, value, preselected, selected}}
							<path
								class:deselected={!selected}
								class:preselected={preselected}
								class:dimmed='{$tooltip.isVisible && highlightedKey !== key}'
								class:focused='{$tooltip.isVisible && highlightedKey === key}'
								d={value}
								stroke='url(#{key})'
							/>
							{/each}
						</g>

						<!-- single year: dots -->
						{#if $availableYearsStore.length === 1}
						<g>
						{#each trends as {key, value}}
							{#each value as d}
								<circle
									cx={getX(d)}
									cy={getY(d)}
									r={radius}
								/>
							{/each}
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
									backgroundColor: 'white',
									backgroundOpacity: 0.5,
								}}
								ticksFormatFn={formatFn}
							/>
						</g>

						<!-- tooltip -->
						{#if $tooltip.isVisible}
							<g
								class='marker'
								transform='translate({$tooltip.dotX},{$tooltip.dotY})'
							>
								<circle r={radius} />
								<g
									class:right={$tooltip.isRight}
									transform='translate({$tooltip.shiftX},{$tooltip.shiftY})'
								>
									<text dy={-tooltipShift} class='bkg'>{$tooltip.value}</text>
									<text dy={-tooltipShift}>{$tooltip.value}</text>
									<text dy={tooltipShift} class='bkg'>{$tooltip.nuts_label}</text>
									<text dy={tooltipShift}>{$tooltip.nuts_label}</text>
								</g>
							</g>
						{/if}

					{:else}
						<text
							class='message'
							x={width / 2}
							y={height / 2}
						>No data</text>
					{/if}
				</svg>
			{/if}

			{#if $geoModalStore.isVisible}
			<GeoFilterModal
				{nutsSelectionStore}
				on:click={toggleGeoModal}
			/>
			{/if}
		</div>

		<!-- modal -->
		{#if $infoModalStore.isVisible}
		<InfoModal
			{api_doc_url}
			{api_type}
			{auth_provider}
			{data_date}
			{description}
			{endpoint_url}
			{is_public}
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
	</section>
</div>

<style>
	.container {
		--indicators-h1-height: 4.5rem;
		height: 100%;
		width: 100%;
		user-select: none;
	}

	header {
		height: var(--indicators-h1-height);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	header div:nth-child(1) {
		flex: 1;
	}
	header div:nth-child(1) h1 {
		margin: 0;
	}
	header div:nth-child(1) p {
		font-style: italic;
		font-size: 1rem;
		color: grey;
	}
	header div:nth-child(2) {
		align-items: center;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		margin-left: 1rem;
	}

	section {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 4rem calc(100% - 4rem);
		height: calc(100% - var(--indicators-h1-height));
		overflow-y: auto;
		position: relative;
		width: 100%;
	}

	.controls {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: space-between;
		width: 100%;
	}

	.controls > div:not(:last-child) {
		margin-right: 0.5rem;
	}

	.globe {
		border: 1px solid lightgrey;
		margin-right: 0.25rem;
		padding: 0.25rem;
	}
	.optgroup {
		display: flex;
		align-items: center;
		padding: 0.25rem;
	}

	.trends {
		position: relative;
	}
	.trends, svg {
		height: 100%;
		width: 100%;
	}

	svg .ref line {
		stroke: var(--color-grey-180);
		pointer-events: none;
	}
	svg .x line {
		stroke-dasharray: 2 2;
		pointer-events: none;
	}
	svg text {
		fill: var(--color-grey-70);
		dominant-baseline: middle;
		font-weight: var(--dim-fontsize-light);
		stroke: none;
		pointer-events: none;
	}
	svg text.label,
	svg text.message {
		text-anchor: middle;
		dominant-baseline: middle;
	}
	svg text.label tspan:nth-child(1) {
		font-weight: bold;
	}
	svg text.label tspan:nth-child(2) {
		font-style: italic;
	}
	svg .left text {
		text-anchor: end;
	}
	svg .right text {
		text-anchor: start;
	}

	svg path {
		fill: none;
		pointer-events: none;
	}
	svg path.focused {
		stroke-width: 3;
		stroke-opacity: 1 !important;
		stroke-dasharray: 10 4;
	}
	svg path.preselected {
		stroke-width: 2;
		stroke-opacity: 1 !important;
		stroke-dasharray: 10 4;
	}
	svg path.dimmed {
		stroke-opacity: 0.6;
	}
	svg path.deselected {
		stroke-width: 0.75;
		stroke-opacity: 0.25;
	}

	svg circle {
		fill: white;
		stroke: black;
		stroke-width: 1.5;
		pointer-events: none;
	}

	/* marker */

	svg .marker text {
		fill: black;
		dominant-baseline: middle;
		pointer-events: none;
	}
	svg .marker text.bkg {
		fill: none;
		stroke: white;
		stroke-width: 5;
		stroke-linecap: round;
		stroke-linecap: round;
	}
	svg .marker .right text {
		text-anchor: end;
	}
</style>
