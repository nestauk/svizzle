<script>
	import {createEventDispatcher} from 'svelte';
	import {writable} from 'svelte/store';
	import {makeStyleVars} from '@svizzle/dom';
	import {vectorLength2D} from '@svizzle/geometry';
	import {
		concat,
		inclusiveRange,
		mergeObj,
	} from '@svizzle/utils';
	import {scaleLinear} from 'd3-scale';
	import {
		appendTo,
		last,
		pullFrom,
		sort,
		uniques,
	} from 'lamb';

	import {getBinsTicks, getBinsTicksExtent} from '@svizzle/histogram/src/utils';

	const dispatch = createEventDispatcher();

	const defaultFlags = {
		isInteractive: false,
		isVertical: false,
		showTicksExtentOnly: false,
		showTicks: true,
		withBackground: false,
	}

	const defaultGeometry = {
		barThickness: 25,
		bottom: 10,
		brushThreshold: 10, // pixels to trigger brushing
		gap: 2,
		left: 10,
		right: 10,
		textPadding: 5,
		top: 10,
	}

	const defaultTheme = {
		backgroundColor: 'white',
		backgroundOpacity: 1,
		binFill: 'white',
		binStroke: null, // null for no stroke, or a color string
		binStrokeWidth: 1, // ineffective for binStroke: null
		brushAddStroke: 'rgb(107,248,134)',
		brushRemoveStroke: 'rgb(246,97,20)',
		brushStrokeOpacity: 0.8,
		brushStrokeWidth: 8,
		fontSize: 12,
		messageColor: 'black',
		messageFontSize: '1rem',
		selectedBinStroke: 'black',
		selectedBinStrokeWidth: 2,
		textColor: 'black',
	}

	// required
	export let height = null;
	export let width = null;

	// optional
	export let bins = []; // {range: [number, number], color: string}[]
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

	/* layout */
	$: innerWidth = Math.max(0, width - geometry.left - geometry.right);
	$: innerHeight = Math.max(0, height - geometry.top - geometry.bottom);
	$: widgetThickness =
		geometry.barThickness + (
			flags.showTicks
				? flags.isVertical
					? 0
					: geometry.textPadding + theme.fontSize
				: 0
		);
	$: origin = {
		x: geometry.left + (flags.isVertical ? (innerWidth - widgetThickness) / 2 : 0),
		y: geometry.top + (flags.isVertical ? 0 : (innerHeight - widgetThickness) / 2),
	};
	$: binsSize = {
		width: flags.isVertical ? geometry.barThickness : innerWidth,
		height: flags.isVertical ? innerHeight : geometry.barThickness,
	};

	/* scale */
	$: valuesExtent = bins.length && [bins[0].range[0], last(bins).range[1]];
	$: range = flags.isVertical ? [innerHeight, 0] : [0, innerWidth];
	$: scale = valuesExtent &&
		scaleLinear().domain(valuesExtent).range(range);

	/* bars */
	$: lastIndex = bins.length - 1;
	$: semigap = geometry.gap / 2;
	$: bars = bins.map((bin, index) => {
		const {range: [v1, v2], color} = bin;
		const selected = selectedBins.length && selectedBins.includes(index);
		const p1 = scale(v1);
		const p2 = scale(v2);
		let x;
		let y;
		let start;
		let end;
		let sensorX;
		let sensorY;
		if (flags.isVertical) {
			start = p1 - (index > 0 ? semigap : 0);
			end = p2 + (index < lastIndex ? semigap : 0);
			x = 0;
			y = end;
			sensorX = 0;
			sensorY = p2;
		} else {
			start = p1 + (index > 0 ? semigap : 0);
			end = p2 - (index < lastIndex ? semigap : 0);
			x = start;
			y = 0;
			sensorX = p1;
			sensorY = 0;
		}
		const barLength = Math.abs(end - start);
		const sensorLength = Math.abs(p2 - p1);

		return {...bin, ...{
			barHeight: flags.isVertical ? barLength : geometry.barThickness,
			barWidth: flags.isVertical ? geometry.barThickness : barLength,
			fill: color || theme.binFill,
			p1,
			p2,
			selected,
			sensorHeight: flags.isVertical ? sensorLength : geometry.barThickness,
			sensorWidth: flags.isVertical ? geometry.barThickness : sensorLength,
			sensorX,
			sensorY,
			x,
			y,
		}}
	});

	/* ticks */
	$: ticksDistance = geometry.barThickness + geometry.textPadding;
	$: ticksValues = flags.showTicksExtentOnly
		? getBinsTicksExtent(bins)
		: getBinsTicks(bins);
	$: ticks = ticksValues.map(value => ({
		label: ticksFormatFn(value),
		x: flags.isVertical ? ticksDistance : scale(value),
		y: flags.isVertical ? scale(value) : ticksDistance,
	}));

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
		bars[brushExtent[0]].p1,
		bars[brushExtent[0]].p2,
		bars[brushExtent[1]].p1,
		bars[brushExtent[1]].p2,
	]);
	$: brushLine = isBrushing && {
		p1: brushExtentBarYs[0],
		p2: brushExtentBarYs[3],
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

	$: style = makeStyleVars({
		...theme,
		brushStroke
	});

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

	const resetBrush = () => {
		_brush.set(brushOff);
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
		class='ColorBinsG'
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

			<g transform='translate({origin.x},{origin.y})'>

				<!-- bars -->
				<g
					class='bars'
					on:mouseleave={resetBrush}
				>
					<rect
						class='barsSensorBkg'
						height={binsSize.height}
						width={binsSize.width}
					/>

					{#each bars as {
						barWidth,
						barHeight,
						fill,
						selected,
						x,
						y
					}, index}
						<g
							class='bar'
							transform='translate({x},{y})'
						>
							<rect
								{fill}
								class:selected
								height={barHeight}
								width={barWidth}
							/>
							{#if flags.isInteractive}
								<rect
									class='rectsensor'
									height={barHeight}
									on:mousedown={onMousedown}
									on:mouseover={onMouseenter(index)}
									on:mouseout={onMouseleave(index)}
									on:mousemove={isMousedown ? onMousemove(index) : null}
									on:mouseup={onMouseup(index)}
									width={barWidth}
								/>
							{/if}
						</g>
					{/each}
				</g>

				<!-- ticks -->
				{#if flags.showTicks}
					<g
						class:vertical={flags.isVertical}
						class='ticks'
						font-size={theme.fontSize}
					>
						{#each ticks as {label, x, y}}
							<text {x} {y}>{label}</text>
						{/each}
					</g>
				{/if}

				<!-- brush -->
				{#if isBrushing}
					<g
						class='brush'
					>
						{#if flags.isVertical}
							<line
								y1={brushLine.p1}
								y2={brushLine.p2}
							/>
						{:else}
							<line
								x1={brushLine.p1}
								x2={brushLine.p2}
								y1={geometry.barThickness}
								y2={geometry.barThickness}
							/>
						{/if}
					</g>
				{/if}
			</g>

		{/if} <!-- if bins -->
	</g>
{/if}

<style>
	.ColorBinsG {
		pointer-events: none;
	}
	.ColorBinsG.interactive {
		pointer-events: auto;
	}

	text.message {
		dominant-baseline: middle;
		fill: var(--messageColor);
		font-size: var(--messageFontSize);
		stroke: none;
		text-anchor: middle;
	}

	rect {
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
		text-anchor: middle;
		user-select: none;
	}

	.bar {
		pointer-events: none;
	}
	.bar rect {
		stroke: var(--binStroke);
		stroke-width: var(--binStrokeWidth);
	}
	.bar rect.selected {
		stroke: var(--selectedBinStroke);
		stroke-width: var(--selectedBinStrokeWidth);
	}
	.barsSensorBkg {
		fill-opacity: 0;
	}
	.bar .rectsensor {
		fill: grey;
		fill-opacity: 0;
		stroke: none;
		cursor: pointer;
		pointer-events: auto;
	}
	.bar .rectsensor:hover {
		fill-opacity: 0.1;
	}

	.brush line {
		stroke-linecap: round;
		stroke-opacity: var(--brushStrokeOpacity);
		stroke-width: var(--brushStrokeWidth);
		stroke: var(--brushStroke);
	}

	.ticks text {
		text-anchor: middle;
		dominant-baseline: hanging;
	}
	.ticks.vertical text {
		text-anchor: start;
		dominant-baseline: middle;
	}
</style>
