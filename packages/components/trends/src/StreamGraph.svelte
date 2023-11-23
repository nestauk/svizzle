<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {setupResizeObserver} from '@svizzle/ui';
	import {
		arrayMaxWith,
		arraySumWith,
		getKey,
		getValue,
		inclusiveRange,
		keyValueArrayToObject,
		makeKeyedZeroes,
		objectToKeyValueArray,
		objectToKeyValuesArray,
		transformValues,
	} from '@svizzle/utils';
	import {pairs} from 'd3-array';
	import {scaleLinear, scalePoint, scaleTime} from 'd3-scale';
	import * as _ from 'lamb';
	import {createEventDispatcher} from 'svelte';

	import {getDateTimeFormat, pluckKeySorted} from './utils.js';

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
		frameFill: 'none',
		frameStroke: 'black',
		gridStroke: 'lightgrey',
		gridStrokeDasharray: '4 8',
		textColor: 'black',
	}

	export let axesLabels;
	export let geometry;
	export let groups;
	export let groupToColorFn;
	export let keyFilterFn;
	export let keyFormatFn = _.identity;
	export let keyType;
	export let points = []; // {group, key, value}[]
	export let sorting = 'off';
	export let theme;
	export let valueFormatFn;
	export let yTicksCount = 10;

	let height;
	let width;

	$: sorting = sorting ?? 'off';
	$: axesLabels = axesLabels ?? [];
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

	/* streams */

	$: points = points ?? [];

	$: allKeys = pluckKeySorted(points);

	$: zeroedGroupsMap = makeKeyedZeroes(groups);
	$: sortingFn = sorting === 'off'
		? _.identity
		: sorting === 'asc'
			? _.sortWith([getValue])
			: _.sortWith([_.sorterDesc(getValue)]);
	$: makeStreams = _.pipe([
		_.groupBy(getKey),
		objectToKeyValuesArray, // {key, values: {group, key, value}[]}[]
		_.mapWith(transformValues({
			values: _.pipe([
				_.mapWith(({group, value}) => ({key: group, value})),
				keyValueArrayToObject,
				kvObject => _.merge(zeroedGroupsMap, kvObject),
				objectToKeyValueArray,
				sortingFn,
				kvObjects => _.reduce(kvObjects, (acc, {key, value}) => {
					acc.array.push({
						key,
						value,
						start: acc.sum,
						end: acc.sum + value,
					});
					acc.sum += value;

					return acc;
				}, {array: [], sum: 0}),
				_.getKey('array'),
			])
		}))
	]);
	$: streams = makeStreams(points)

	/* scales, axes */

	const getMaxSum = _.pipe([
		_.groupBy(getKey),
		_.values,
		arrayMaxWith(arraySumWith(getValue))
	]);
	$: maxSum = getMaxSum(points);
	$: yTicks = inclusiveRange([0, maxSum, maxSum / yTicksCount]);

	/* paths */

	const makeGetPaths = ({xScale, yScale}) => _.pipe([
		pairs,
		_.flatMapWith(
			_.pipe([
				_.flatMapWith(
					({key, values}) => _.map(values, value => ({key, value}))
				),
				_.groupBy(_.getPath('value.key')),
				_.mapValuesWith(
					_.pipe([
						_.sortWith([getKey]),
						([L, R]) => {
							const p1 = {x: xScale(L.key), y: yScale(L.value.end)};
							const p2 = {x: xScale(R.key), y: yScale(R.value.end)};
							const p3 = {x: xScale(R.key), y: yScale(R.value.start)};
							const p4 = {x: xScale(L.key), y: yScale(L.value.start)};
							const midX = (p1.x + p2.x) / 2;
							const c1 = {x: midX, y: p1.y};
							const c2 = {x: midX, y: p2.y};
							const c3 = {x: midX, y: p3.y};
							const c4 = {x: midX, y: p4.y};
							const M1 = `M ${p1.x} ${p1.y}`;
							const C12 = `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
							const L23 = `L ${p3.x} ${p3.y}`;
							const C34 = `C ${c3.x} ${c3.y} ${c4.x} ${c4.y} ${p4.x} ${p4.y}`;

							const path = `${M1} ${C12} ${L23} ${C34} Z`;
							const category = L.value.key;
							const fill = groupToColorFn(category);

							return {
								category,
								data: [L, R],
								fill,
								id: `${L.key}_${R.key}_${category}`,
								path,
								range: [L.key, R.key],
							};
						},
					])
				),
				_.values
			])
		),
	]);

	let bbox;
	let doDraw = false;
	let keyTicks;
	let paths = [];
	let xScale;
	let yScale;

	$: if (height && width && streams) {
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

		yScale = scaleLinear().domain([0, maxSum]).range([bbox.bly, bbox.try]);

		const getPaths = makeGetPaths({xScale, yScale});
		paths = getPaths(streams);

		doDraw = true;
	}
</script>

<div
	{style}
	class='StreamGraph'
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

				<!-- paths -->
				<g class='path'>
					{#each paths as p (p.id)}
						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<path
							d={p.path}
							fill={p.fill}
							on:mousemove={({x, y}) => {
								dispatch('areaHovered', {key: p.category, x, y})
							}}
							on:mouseout={({x, y}) => {
								dispatch('areaExited', {key: p.category, x, y})
							}}
							on:touchend={() => {
								dispatch('areaTouchEnded', {key: p.category})
							}}
							on:touchstart|preventDefault={({targetTouches: [touch]}) => {
								const {clientX: x, clientY: y} = touch;
								dispatch('areaTouchStarted', {
									key: p.category,
									x,
									y
								})
							}}
							stroke={p.fill}
						/>
					{/each}
				</g>

				<!-- grid -->
				<g class='grid'>
					{#each keyTicks as [key]}
						<line
							x1={xScale(key)}
							x2={xScale(key)}
							y1={bbox.bly}
							y2={bbox.try}
						/>
					{/each}
					{#each yTicks as value}
						<line
							x1={bbox.blx}
							x2={bbox.trx}
							y1={yScale(value)}
							y2={yScale(value)}
						/>
					{/each}
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
	.StreamGraph {
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
</style>
