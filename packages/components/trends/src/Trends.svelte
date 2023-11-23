<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {setupResizeObserver} from '@svizzle/ui';
	import {
		arrayMaxWith,
		arrayMinWith,
		getKey,
		getValue,
		getValues,
		inclusiveRange,
		isIterableLongerThan1,
		pluckKey,
	} from '@svizzle/utils';
	import {scaleLinear, scalePoint, scaleTime} from 'd3-scale';
	import {line, curveMonotoneX} from 'd3-shape';
	import {quadtree} from 'd3-quadtree';
	import * as _ from 'lamb';
	import {createEventDispatcher} from 'svelte';

	import {getDateTimeFormat} from './utils.js';

	const dispatch = createEventDispatcher();
	const {
		_writable: _size,
		resizeObserver: sizeObserver
	} = setupResizeObserver();

	const defaultGeometry = {
		dotRadius: 2,
		heroDotRadius: 4,
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

		heroStrokeWidth: 2,
		textColor: 'black',
	}

	// {key, values: {key, value}[]}[]
	// outer key is the trend name, inner key is the x key
	const defaultTrends = [{key: 'trend', values: []}];

	export let axesLabels;
	export let geometry;
	export let hero;
	export let keyFilterFn = null;
	export let keyFormatFn = _.identity;
	export let keyToColorFn = null;
	export let keyType;
	export let preformatDate = _.identity;
	export let theme = null;
	export let trends;
	export let trendType = 'progressive'; // | 'cumulative'
	export let valueFormatFn;
	export let yTicksCount = 10;

	let bbox;
	let doDraw = false;
	let dotRadius;
	let height;
	let keyTicks;
	let lineGenerator;
	let quadTree;
	let width;
	let xScale;
	let yDelta;
	let yDomain;
	let yScale;
	let yTicks;

	$: axesLabels = axesLabels ?? [];
	$: keyFormatFn = keyFormatFn ?? _.identity;
	$: preformatDate = preformatDate ?? _.identity;
	$: valueFormatFn = valueFormatFn ?? _.identity;
	$: yTicksCount = yTicksCount ?? 10;

	/* theme */

	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);

	/* geometry */

	const labelsDx = 20;

	$: geometry = geometry ? {...defaultGeometry, ...geometry} : defaultGeometry;
	$: labelsDy = Math.min(geometry.safetyBottom, geometry.safetyTop) / 2;
	$: ({inlineSize: width, blockSize: height} = $_size);

	/* quadtree */

	const selectNearestDot = ({target, x, y}) => {
		const {left, top} = target.parentElement.getBoundingClientRect();

		const x1 = x - left;
		const y1 = y - top;

		const data = quadTree.find(x1, y1);

		return {
			data,
			x: left + xScale(getKey(data)),
			y: top + yScale(getValue(data))
		};
	}

	/* frame event handlers */

	const onFrameHovered = ({target, x, y}) => {
		const payload = selectNearestDot({target, x, y});

		dispatch('dotHovered', payload);
	}
	const onFrameExited = () => {
		dispatch('dotExited');
	}

	const onFrameTouchStarted = ({target, targetTouches: [touch]}) => {
		const {clientX: x, clientY: y} = touch;
		const payload = selectNearestDot({target, x, y});

		dispatch('dotTouchStarted', payload);
	}
	const onFrameTouchEnded = () => {
		dispatch('dotTouchEnded');
	}

	/* data */

	$: trends = trends ?? defaultTrends;
	$: if (trendType === 'cumulative') {
		trends = _.map(trends, ({key, values}) => {
			const cumulativeValues = _.reduce(
				values,
				(acc, {key: subKey, value}) => {
					acc.sum += value;
					acc.array.push({key: subKey, value: acc.sum});

					return acc;
				},
				{sum: 0, array: []}
			).array;

			return {key, values: cumulativeValues}
		});
	}

	const getSortedKeys = _.pipe([
		_.flatMapWith(getValues),
		pluckKey,
		_.uniques,
		_.sortWith()
	]);
	$: allKeys = getSortedKeys(trends);

	const getMaxValue = arrayMaxWith(getValue);
	const getMinValue = arrayMinWith(getValue);

	$: trends = _.map(trends, ({key, values}) => ({
		key,
		values: _.map(values, _.setKey('trendKey', key))
	}));
	$: allData = _.flatMap(trends, getValues);
	$: maxValue = getMaxValue(allData);
	$: maxValueSign = Math.sign(maxValue);
	$: minValue = getMinValue(allData);
	$: minValueSign = Math.sign(minValue);

	$: doHighlightHeroCurve = isIterableLongerThan1(trends);
	$: heroCurveValues = hero
		? _.find(trends, _.pipe([getKey, _.is(hero.trendKey)]))?.values
		: [];

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
		yTicks = inclusiveRange([...yDomain, yDelta / yTicksCount]);
	}

	$: if (height && width) {
		bbox = {
			blx: geometry.safetyLeft,
			bly: height - geometry.safetyBottom,
			height: height - geometry.safetyTop - geometry.safetyBottom,
			trx: width - geometry.safetyRight,
			try: geometry.safetyTop,
			width: width - geometry.safetyRight - geometry.safetyLeft,
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

		dotRadius = allKeys.length === 1
			? geometry.dotRadius
			: Math.min(
				(xScale(allKeys[1]) - xScale(allKeys[0])) / 3,
				geometry.dotRadius
			);

		yScale = scaleLinear().domain(yDomain).range([bbox.bly, bbox.try]);

		lineGenerator = line()
		.x(d => xScale(getKey(d)))
		.y(d => yScale(getValue(d)))
		.curve(curveMonotoneX);

		quadTree = quadtree()
		.x(d => xScale(getKey(d)))
		.y(d => yScale(getValue(d)))
		.addAll(allData);

		doDraw = true;
	}
</script>

<div
	{style}
	class='Trends'
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

				<!-- frame -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<rect
					role='none'
					class='frame'
					height={bbox.height}
					on:mousemove|capture={onFrameHovered}
					on:mouseout={onFrameExited}
					on:touchstart={onFrameTouchStarted}
					on:touchend={onFrameTouchEnded}
					width={bbox.width}
					x={bbox.blx}
					y={bbox.try}
				/>

				{#each trends as {key, values} (key)}
					<path
						d={lineGenerator(values)}
						stroke={keyToColorFn?.(key) ?? 'var(--curveStroke)'}
					/>

					{#each values as data}
						<circle
							cx={xScale(getKey(data))}
							cy={yScale(getValue(data))}
							fill={keyToColorFn?.(key) ?? 'var(--curveStroke)'}
							r={dotRadius}
						/>
					{/each}
				{/each}

				{#if hero}
					<g class='hero'>
						<path
							d={lineGenerator(heroCurveValues)}
							class:highlighted={doHighlightHeroCurve}
							stroke={keyToColorFn?.(hero.trendKey) ?? 'var(--curveStroke)'}
						/>

						{#if getKey(hero)}
							<circle
								cx={xScale(getKey(hero))}
								cy={yScale(getValue(hero))}
								fill={keyToColorFn?.(hero.trendKey) ?? 'var(--curveStroke)'}
								r={geometry.heroDotRadius}
							/>
						{/if}
					</g>
				{/if}

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
	.Trends{
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
	svg * {
		pointer-events: none;
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
	.frame {
		pointer-events: all;
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
		fill: none;
		stroke-width: var(--curveStrokeWidth);
	}

	path.highlighted {
		stroke-width: var(--heroStrokeWidth);
	}
</style>
