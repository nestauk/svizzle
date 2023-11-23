<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {setupResizeObserver} from '@svizzle/ui';
	import {
		arrayMaxWith,
		arrayMinWith,
		getKey,
		getValues,
		inclusiveRange,
		pluckKey,
	} from '@svizzle/utils';
	import {scaleLinear, scalePoint, scaleTime} from 'd3-scale';
	import {area, line, curveMonotoneX} from 'd3-shape';
	import * as _ from 'lamb';
	import {createEventDispatcher} from 'svelte';

	import {getDateTimeFormat} from './utils.js';

	const dispatch = createEventDispatcher();
	const {
		_writable: _size,
		resizeObserver: sizeObserver
	} = setupResizeObserver();

	const defaultGeometry = {
		safetyBottom: 20,
		safetyLeft: 20,
		safetyRight: 20,
		safetyTop: 20,
	}

	const defaultTheme = {
		curveStroke: 'black',
		curveStrokeWidth: 1,

		// frame theme
		frameFill: 'none',
		frameStroke: 'black',
		gridStroke: 'lightgrey',
		gridStrokeDasharray: '4 8',
		textColor: 'black',
	}

	const defaultItems = []; // {key, values: {min, max, avg, '1.0', ...}}[]

	export let areaLowKeyToColor;
	export let axesLabels;
	export let config;
	export let geometry;
	export let items = defaultItems;
	export let keyFilterFn = null;
	export let keyFormatFn = _.identity;
	export let keyToColorFn = null;
	export let keyType;
	export let theme = null;
	export let valueFormatFn;
	export let yTicksCount = 10;

	let height;
	let width;

	$: axesLabels = axesLabels ?? [];
	$: items = items ?? defaultItems;
	$: keyFormatFn = keyFormatFn ?? _.identity;
	$: yTicksCount = yTicksCount ?? 10;
	$: valueFormatFn = valueFormatFn ?? _.identity;

	/* theme */

	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);

	/* geometry */

	const labelsDx = 20;
	$: geometry = geometry ? {...defaultGeometry, ...geometry} : defaultGeometry;
	$: labelsDy = Math.min(geometry.safetyBottom, geometry.safetyTop) / 2;
	$: ({inlineSize: width, blockSize: height} = $_size);

	/* data */

	const getSortedKeys = _.pipe([
		pluckKey,
		_.uniques,
		_.sortWith()
	]);
	$: allKeys = getSortedKeys(items);

	const getMaxValue = arrayMaxWith(_.getPath('values.max'));
	const getMinValue = arrayMinWith(_.getPath('values.min'));

	$: maxValue = getMaxValue(items);
	$: maxValueSign = Math.sign(maxValue);
	$: minValue = getMinValue(items);
	$: minValueSign = Math.sign(minValue);

	let yDomain;
	let yDelta;
	$: {
		if (maxValueSign !== minValueSign) {
			yDomain = [minValue, maxValue];
			yDelta = maxValue - minValue;
		} else if (maxValueSign === 1) {
			yDomain = [0, maxValue];
			yDelta = maxValue;
		} else {
			yDomain = [minValue, 0];
			yDelta = -minValue;
		}
	}
	$: yTicks = inclusiveRange([...yDomain, yDelta / yTicksCount]);

	let areas;
	let bbox;
	let doDraw = false;
	let keyTicks;
	let lines;
	let xScale;
	let yScale;

	$: if (height && width) {
		bbox = {
			blx: geometry.safetyLeft,
			bly: height - geometry.safetyBottom,
			trx: width - geometry.safetyRight,
			try: geometry.safetyTop,
			width: width - geometry.safetyRight - geometry.safetyLeft,
			height: height - geometry.safetyTop - geometry.safetyBottom,
		}

		const xRange = [bbox.blx, bbox.trx];
		if (keyType === 'date') {
			const keyDomain = [_.head(allKeys), _.last(allKeys)];
			const keyRankFn = key => new Date(key).getTime();
			const timeDomain = _.map(keyDomain, keyRankFn);
			const timeScale = scaleTime().domain(timeDomain).range(xRange);

			const ticks = timeScale.ticks();
			const tickDurationInSecs =
				(timeDomain[1] - timeDomain[0]) / 1000 / (ticks.length - 1);
			const timeFormat = getDateTimeFormat(tickDurationInSecs);
			keyTicks = _.map(ticks, _.collect([_.identity, timeFormat]));

			xScale = _.pipe([keyRankFn, timeScale]);
		} else {
			keyTicks = _.map(
				keyFilterFn ? _.filter(allKeys, keyFilterFn) : allKeys,
				_.collect([_.identity, keyFormatFn])
			);
			xScale = scalePoint().domain(allKeys).range(xRange);
		}

		yScale = scaleLinear().domain(yDomain).range([bbox.bly, bbox.try]);

		const getX = _.pipe([getKey, xScale]);

		areas = _.map(
			config.areas,
			([lowKey, highKey]) => ({
				color: areaLowKeyToColor(lowKey),
				generator: area()
				.x(getX)
				.y0(_.pipe([getValues, _.getKey(lowKey), yScale]))
				.y1(_.pipe([getValues, _.getKey(highKey), yScale]))
				.curve(curveMonotoneX),
				highKey,
				key: `${lowKey} - ${highKey}`,
				lowKey,
			})
		);

		lines = _.map(
			config.trends,
			key => ({
				key,
				generator: line()
				.x(getX)
				.y(_.pipe([getValues, _.getKey(key), yScale]))
				.curve(curveMonotoneX)
			})
		);

		doDraw = true;
	}
</script>

<div
	{style}
	class='StatsTrends'
>
	<div
		class='chart'
		use:sizeObserver
	>
		{#if doDraw}
			<svg
				{height}
				{width}
			>
				<!-- areas -->
				{#each areas as {color, generator, key, lowKey} (lowKey)}
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<path
						role='none'
						d={generator(items)}
						fill={color}
						on:mousemove={({x, y}) => {
							dispatch('areaHovered', {key, x, y})
						}}
						on:mouseout={({x, y}) => {
							dispatch('areaExited', {key, x, y})
						}}
						on:touchstart|preventDefault={({targetTouches: [touch]}) => {
							const {clientX: x, clientY: y} = touch;
							dispatch('areaTouchStarted', {key, x, y})
						}}
						on:touchend={() => {
							dispatch('areaTouchEnded', {key})
						}}
					/>
				{/each}

				<!-- lines -->
				{#each lines as {generator, key} (key)}
					<path
						class='line'
						d={generator(items)}
						fill='none'
						stroke={keyToColorFn?.(key) ?? 'var(--curveStroke)'}
					/>
				{/each}

				<!-- x-ticks -->
				<g class='x-ticks'>
					{#each keyTicks as [key, label]}
						<g class='ticks'>
							<text
								class='centered'
								dy={labelsDy}
								x={xScale(key)}
								y={bbox.bly}
							>
								{label}
							</text>
							<text
								class='centered'
								dy={-labelsDy}
								x={xScale(key)}
								y={bbox.try}
							>
								{label}
							</text>
						</g>
					{/each}
				</g>

				<!-- y-ticks -->
				<g class='y-ticks'>
					{#each yTicks as value}
						<g class='ticks'>
							<text
								class='left'
								dx={-labelsDx}
								x={bbox.blx}
								y={yScale(value)}
							>
								{valueFormatFn(value)}
							</text>
							<text
								class='right'
								dx={labelsDx}
								x={bbox.trx}
								y={yScale(value)}
							>
								{valueFormatFn(value)}
							</text>
						</g>
					{/each}
				</g>

				<!-- grid -->
				<g class='grid'>
					<g class='vertical'>
						{#each keyTicks as [key]}
							<line
								x1={xScale(key)}
								x2={xScale(key)}
								y1={bbox.bly}
								y2={bbox.try}
							/>
						{/each}
					</g>
					<g class='horizontal'>
						{#each yTicks as value}
							<line
								x1={bbox.blx}
								x2={bbox.trx}
								y1={yScale(value)}
								y2={yScale(value)}
							/>
						{/each}
					</g>
				</g>

				<!-- frame -->
				<rect
					x={bbox.blx}
					y={bbox.try}
					width={bbox.width}
					height={bbox.height}
				/>

			</svg>
		{/if}
	</div>

	{#each axesLabels as {label, gridAreas}}
		{#each gridAreas as gridArea}
			<div class='{gridArea} area'>
				{label}
			</div>
		{/each}
	{/each}
</div>

<style>
	.StatsTrends {
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-areas:
			'tl top tr'
			'left chart right'
			'bl bottom br';
		grid-template-columns: min-content 1fr min-content;
		grid-template-rows: min-content 1fr min-content;
	}
	svg {
		display: block;
		height: 100%;
		width: 100%;
	}
	.chart {
		grid-area: chart;
		overflow: hidden;
	}
	.bottom.area {
		grid-area: bottom;
	}
	.left.area {
		grid-area: left;
	}
	.right.area {
		grid-area: right;
	}
	.top.area {
		grid-area: top;
	}
	.left.area, .right.area, .top.area, .bottom.area {
		text-align: center;
	}
	.left.area, .right.area {
		writing-mode: vertical-lr;
		transform: rotate(180deg);
		transform-origin: 41% 50%;
	}

	.grid line {
		stroke: var(--gridStroke);
		stroke-dasharray: var(--gridStrokeDasharray);
	}

	.ticks text {
		dominant-baseline: middle;
		fill: var(--textColor);
		stroke: none;
		font-size: 0.75em;
	}
	text.centered {
		text-anchor: middle;
	}
	text.left {
		text-anchor: end;
	}
	text.right {
		text-anchor: start;
	}

	rect {
		stroke: var(--frameStroke);
		fill: var(--frameFill);
	}

	path {
		stroke-width: var(--curveStrokeWidth);
	}
	path.line {
		pointer-events: none;
	}
</style>
