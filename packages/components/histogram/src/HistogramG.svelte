<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {vectorLength2D} from '@svizzle/geometry';
	import {
		arrayMaxWith,
		concat,
		getValue,
		inclusiveRange,
		mergeObj,
	} from '@svizzle/utils';
	import {scaleLinear, scaleLog} from 'd3-scale';
	import {
		appendTo,
		getKey,
		has,
		last,
		pullFrom,
		sort,
		uniques,
	} from 'lamb';
	import {createEventDispatcher} from 'svelte';
	import {writable} from 'svelte/store';

	import {
		getBinsTicks,
		getValuesLength,
	} from './utils.js';

	const dispatch = createEventDispatcher();
	const makeMaxBarThickness = arrayMaxWith(getKey('barThickness'));

	const defaultFlags = {
		hideOrigin: false,
		hideTicks: false,
		isInteractive: false,
		isRightToLeft: false,
		isTopDown: false,
		useLogScale: false,
		withBackground: false,
	}

	const defaultGeometry = {
		// exposed but undocumented on the site
		brushThreshold: 10, // pixels to trigger brushing
		fontSizeFactor: 0.6,
		maxFontSize: 12,
		textPadding: 5,

		// documented on the site
		originRadius: 2,
		safetyXNoTicks: 20,
		safetyXTicks: 50,
		safetyXValues: 25,
		safetyY: 20,
	}

	const defaultTheme = {
		// exposed but undocumented
		backgroundOpacity: 1,

		// exposed and documented but no example
		brushAddStroke: 'rgb(107,248,134)',
		brushRemoveStroke: 'rgb(246,97,20)',
		brushStrokeOpacity: 0.8,
		brushStrokeWidth: 8,

		// exposed but undocumented on the site
		axisStrokeWidth: 1,
		backgroundColor: 'white',
		binFill: 'white',
		binStroke: 'black',
		binStrokeWidth: 1,
		originColor: 'black',
		messageColor: 'black',
		messageFontSize: '1rem',
		selectedBinFill: 'rgb(255, 174, 0)',
		selectedBinStroke: 'black',
		selectedBinStrokeWidth: 2,
		textColor: 'black',
	}

	// required
	export let height = null;
	export let width = null;

	// optional
	export let bins = [];
	export let binsFill = null;
	export let flags = null;
	export let geometry = null;
	export let message = 'No data';
	export let selectedBins = [];
	export let theme = null;
	export let ticksFormatFn = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: bins = bins || [];
	$: flags = flags ? {...defaultFlags, ...flags} : defaultFlags;
	$: geometry = geometry ? {...defaultGeometry, ...geometry} : defaultGeometry;
	$: message = message || 'No data';
	$: selectedBins = selectedBins || [];
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: ticksFormatFn = ticksFormatFn || (x => x);

	let rangesExtent = [];

	$: safety = {
		top: geometry.safetyY,
		right: flags.isRightToLeft
			? flags.hideTicks ? geometry.safetyXNoTicks : geometry.safetyXTicks
			: geometry.safetyXValues,
		bottom: geometry.safetyY,
		left: flags.isRightToLeft
			? geometry.safetyXValues
			: flags.hideTicks ? geometry.safetyXNoTicks : geometry.safetyXTicks,
	};
	$: innerWidth = Math.max(0, width - safety.left - safety.right);
	$: innerHeight = Math.max(
		0,
		height - safety.top - safety.bottom - geometry.maxFontSize
	);
	$: origin = {
		x: flags.isRightToLeft ? innerWidth : 0,
		y: flags.isTopDown ? 0 : innerHeight
	}
	$: direction = {
		x: flags.isRightToLeft ? -1 : 1,
		y: flags.isTopDown ? 1 : -1
	}
	$: ticksX = flags.isRightToLeft
		? geometry.originRadius + geometry.textPadding
		: -(geometry.originRadius + geometry.textPadding);
	$: ticksAnchor = flags.isRightToLeft ? 'start' : 'end';
	$: ticks = getBinsTicks(bins).map(tick => ({
		tick: ticksFormatFn(tick),
		y: flags.isTopDown ? scales.y(tick) : -scales.y(tick)
	}));

	$: useValue = bins.length && has(bins[0], 'value');
	$: getBinsMax = useValue
		? arrayMaxWith(getValue)
		: arrayMaxWith(getValuesLength);
	$: valuesMax = getBinsMax(bins);
	$: rangesExtent = bins.length
		? [bins[0].range[0], last(bins).range[1]]
		: [];

	/* eslint-disable indent */
	$: scales = bins.length && {
		x: flags.useLogScale
			? scaleLog()
				.domain([1, valuesMax])
				.range([innerWidth / Math.log10(valuesMax), innerWidth])
			: scaleLinear().domain([0, valuesMax]).range([0, innerWidth]),
		y: scaleLinear().domain(rangesExtent).range([0, innerHeight])
	}
	/* eslint-enable indent */

	$: bars = bins.map((bin, index) => {
		const {range, values, value} = bin;
		const selected = selectedBins.length && selectedBins.includes(index);
		const displayValue = values ? values.length : value;
		const barLength = scales.x(displayValue);
		const barThickness = scales.y(range[1]) - scales.y(range[0]);
		const x = flags.isRightToLeft ? innerWidth - barLength : 0;
		const y1 = flags.isTopDown
			? scales.y(range[0])
			: innerHeight - scales.y(range[0]) - barThickness;
		const y2 = y1 + barThickness;
		const labelX = flags.isRightToLeft
			? x - geometry.textPadding
			: barLength + geometry.textPadding;
		const labelAnchor = flags.isRightToLeft ? 'end' : 'start';
		const fill = bin.color
			|| (binsFill && binsFill[index] ? binsFill[index] : theme.binFill);

		return {...bin, ...{
			barLength,
			barThickness,
			displayValue,
			fill,
			labelAnchor,
			labelX,
			selected,
			x,
			y1,
			y2,
		}}
	});
	$: maxBarThickness = makeMaxBarThickness(bars);
	$: fontSize = Math.min(
		geometry.maxFontSize,
		geometry.fontSizeFactor * maxBarThickness
	);

	/* brushing */

	let isMousedown = false;
	const brushOff = {
		delta: 0,
		end: null,
		origin: {x: null, y: null},
		start: null,
		modifier: null,
		state: 'Off',
	};
	const _brush = writable(brushOff);

	$: isBrushing = $_brush.state === 'Brushing';
	$: isPressed = $_brush.state === 'Pressed';
	$: doesBrushAdd = $_brush.modifier === 'shift';
	$: doesBrushRemove = $_brush.modifier === 'alt';
	$: brushStroke =
		doesBrushAdd
			? theme.brushAddStroke
			: doesBrushRemove
				? theme.brushRemoveStroke
				: null;
	$: brushExtent = isBrushing && sort([$_brush.start, $_brush.end]);
	$: brushRange = isBrushing && inclusiveRange(brushExtent);
	$: brushExtentBarYs = isBrushing && sort([
		bars[brushExtent[0]].y1,
		bars[brushExtent[0]].y2,
		bars[brushExtent[1]].y1,
		bars[brushExtent[1]].y2,
	]);
	$: brushLine = isBrushing && {
		y1: brushExtentBarYs[0],
		y2: brushExtentBarYs[3],
	};
	$: if (isBrushing) {
		selectedBins =
			doesBrushAdd
				? uniques(concat(selectedBins, brushRange))
				: doesBrushRemove
					? pullFrom(selectedBins, brushRange)
					: brushRange;
		dispatch('brushed', {
			end: $_brush.end,
			selectedBins,
			start: $_brush.start,
		});
	}

	/* style */

	$: style = makeStyleVars({...theme, brushStroke});

	/* events */

	const getModifier = event =>
		event.shiftKey ? 'shift' : event.altKey ? 'alt' : null;

	const onMouseenter = index => () => {
		if (isBrushing) {
			_brush.update(mergeObj({end: index}));
		}
		dispatch('entered', index);
	}

	const onMousedown = event => {
		isMousedown = true;

		_brush.set({
			delta: 0,
			modifier: getModifier(event),
			origin: {
				x: event.offsetX,
				y: event.offsetY,
			},
			state: 'Pressed',
		});
	}

	const onMousemove = index => event => {
		if (isPressed) {
			const delta = vectorLength2D(
				event.offsetX - $_brush.origin.x,
				event.offsetY - $_brush.origin.y
			);
			if (delta > geometry.brushThreshold) {
				_brush.update(mergeObj({
					end: index,
					start: index,
					state: 'Brushing',
				}));
				dispatch('brushstart', index);
			} else {
				_brush.update(mergeObj({delta}));
			}
		}
	}

	const onMouseup = index => () => {
		isMousedown = false;

		if (isPressed) {
			if ($_brush.delta < geometry.brushThreshold) {
				if (doesBrushAdd) {
					selectedBins = uniques(appendTo(selectedBins, index))
				} else if (doesBrushRemove) {
					selectedBins = pullFrom(selectedBins, [index])
				} else {
					selectedBins = [index];
				}

				dispatch('clicked', {index, selectedBins});
			}
		} else if (isBrushing) {
			dispatch('brushend', index);
		}
		_brush.set(brushOff);
	}

	const onMouseleave = index => () => {
		dispatch('exited', index);
	}

	const resetSelection = () => {
		selectedBins = [];
		dispatch('clicked', {selectedBins});
	}
</script>

<svelte:options namespace='svg' />

{#if height && width}
	<g
		{style}
		class:interactive={flags.isInteractive}
		class='HistogramG'
	>
		{#if bins.length === 0}

			<text
				class='message'
				x={width/2}
				y={height/2}
			>{message}</text>

		{:else}

			<!-- background -->
			{#if flags.withBackground}
				<rect class='bkg' {width} {height} />
			{/if}

			<!-- sensor to dismiss the selection -->
			{#if flags.isInteractive}
				<rect
					{height}
					{width}
					class:reset={selectedBins.length > 0}
					class='bkgSensor'
					on:click={resetSelection}
				/>
			{/if}

			<g transform='translate({safety.left},{safety.top})'>
				{#each bars as {
					barLength,
					barThickness,
					displayValue,
					fill,
					labelAnchor,
					labelX,
					selected,
					x,
					y1,
				}, index}
					<g
						class='bin'
						transform='translate(0,{y1})'
					>
						{#if displayValue}
							<rect
								{fill}
								{x}
								class='bar'
								class:selected
								height={barThickness}
								width={barLength}
							/>
						{/if}

						<text
							class='binsize'
							x={labelX}
							y={barThickness / 2}
							font-size={fontSize}
							text-anchor={labelAnchor}
						>{displayValue}</text>

						{#if flags.isInteractive}
							<rect
								class='sensor'
								height={barThickness}
								on:mousedown={onMousedown}
								on:mouseenter={onMouseenter(index)}
								on:mouseleave={onMouseleave(index)}
								on:mousemove={isMousedown ? onMousemove(index) : null}
								on:mouseup={onMouseup(index)}
								width={innerWidth}
							/>
						{/if}
					</g>
				{/each}

				<g
					class='axis'
					transform=translate({origin.x},{origin.y})
				>
					<line
						y2={flags.isTopDown ? innerHeight : -innerHeight}
					/>

					{#if !flags.hideOrigin}
						<circle r={geometry.originRadius} />
					{/if}

					{#if !flags.hideTicks}
						{#each ticks as {tick, y}}
							<text
								class='range'
								x={ticksX}
								{y}
								font-size={fontSize}
								text-anchor={ticksAnchor}
							>{tick}</text>
						{/each}
					{/if}
				</g>

				{#if isBrushing}
					<g
						class='brush'
						transform=translate({origin.x},0)
					>
						<line
							y1={brushLine.y1}
							y2={brushLine.y2}
						/>
					</g>
				{/if}
			</g>

		{/if} <!-- if no bins -->

	</g>
{/if}

<style>
	.HistogramG {
		pointer-events: none;
	}
	.HistogramG.interactive {
		pointer-events: auto;
	}

	text.message {
		dominant-baseline: middle;
		fill: var(--messageColor);
		font-size: var(--messageFontSize);
		stroke: none;
		text-anchor: middle;
	}

	rect, line {
		shape-rendering: crispEdges;
	}
	rect.bkg {
		fill: var(--backgroundColor);
		fill-opacity: var(--backgroundOpacity);
	}

	rect.bkgSensor {
		fill-opacity: 0;
	}
	rect.bkgSensor.reset {
		cursor: pointer;
	}

	text {
		dominant-baseline: middle;
		fill: var(--textColor);
		pointer-events: none;
		stroke: none;
		user-select: none;
	}

	.bin {
		pointer-events: none;
	}
	.bin rect.bar {
		stroke: var(--binStroke);
		stroke-width: var(--binStrokeWidth);
	}
	.bin rect.bar.selected {
		fill: var(--selectedBinFill);
		stroke: var(--selectedBinStroke);
		stroke-width: var(--selectedBinStrokeWidth);
	}
	.bin .sensor {
		fill: grey;
		fill-opacity: 0;
		stroke: none;
		cursor: pointer;
		pointer-events: auto;

	}
	.bin .sensor:hover {
		fill-opacity: 0.1;
	}

	.axis circle {
		fill: var(--originColor);
	}
	.axis line {
		stroke: grey;
		stroke-width: var(--axisStrokeWidth);
	}

	.brush line {
		stroke-linecap: round;
		stroke-opacity: var(--brushStrokeOpacity);
		stroke-width: var(--brushStrokeWidth);
		stroke: var(--brushStroke);
	}
</style>
