<script>
	import isEqual from 'just-compare';
	import {
		index,
		isIn,
		mapWith,
		pipe,
		sortWith,
	} from 'lamb';
	import {
		afterUpdate,
		beforeUpdate,
		createEventDispatcher
	} from 'svelte';
	import {linearScale} from 'yootils';
	import {makeStyleVars, toPx} from '@svizzle/dom';
	import {
		arrayMaxWith,
		arrayMinWith,
		getKey,
		getValue,
		makeMergeAppliedFnMap,
		sliceString,
	} from '@svizzle/utils';

	const dispatch = createEventDispatcher();
	const sortByValue = sortWith([getValue]);
	const transparentColor = 'rgba(0,0,0,0)';

	const augmentTheme = makeMergeAppliedFnMap({
		paddingPx: pipe([x => x.padding, toPx])
	});

	const defaultTheme = {
		// exposed but undocumented
		backgroundOpacity: 1,

		// exposed and documented
		axisColor: 'lightgrey',
		backgroundColor: transparentColor,
		barDefaultColor: 'black',
		deselectedOpacity: 0.25,
		focusedKeyColor: 'rgba(0, 0, 0, 0.1)',
		fontSize: 14,
		headerHeight: '2em',
		hoverColor: 'rgba(0, 0, 0, 0.05)',
		messageColor: 'black',
		messageFontSize: '1rem',
		padding: 10,
		refColor: 'grey',
		refDasharray: '4 4',
		refWidth: 0.5,
		textColor: 'grey',
		titleFontSize: '1.5em',
	};

	export let barHeight = 4;
	export let focusedKey = null;
	export let formatFn = null;
	export let isInteractive = false;
	export let items = []; // {key, value}[]
	export let keyToColor = null;
	export let keyToColorFn = null;
	export let keyToLabel = null;
	export let keyToLabelFn = null;
	export let message = null;
	export let refs = [];
	export let selectedKeys = [];
	export let shouldResetScroll = false;
	export let shouldScrollToFocusedKey = false;
	export let theme = null;
	export let title = null;
	export let valueAccessor = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: barHeight = barHeight || 4;
	$: isInteractive = isInteractive || false;
	$: items = items || [];
	$: message = message || 'No data';
	$: refs = refs || [];
	$: selectedKeys = selectedKeys || [];
	$: shouldResetScroll = shouldResetScroll || false;
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;

	let height;
	let hoveredKey;
	let width;

	$: style = makeStyleVars({
		...augmentTheme(theme),
		refsHeightPx: toPx(refsHeight)
	});

	$: valueAccessor = valueAccessor || getValue;

	$: averageCharWidth = theme.fontSize * 0.5;
	$: barPadding = theme.fontSize / 2;
	$: labelValueDistance = 3 * barPadding;
	$: itemHeight = theme.fontSize + barHeight + 3 * barPadding;
	$: barY = itemHeight - barPadding - barHeight / 2;
	$: textY = itemHeight - barHeight - 2 * barPadding;
	$: svgHeight = itemHeight * items.length;
	$: getMin = arrayMinWith(valueAccessor);
	$: getMax = arrayMaxWith(valueAccessor);
	$: refsValues = refs.map(getValue);
	$: min = Math.min(getMin(items), ...refsValues);
	$: max = Math.max(getMax(items), ...refsValues);
	$: crossesZero = Math.sign(min) === -Math.sign(max);
	$: allNegatives = !crossesZero && Math.sign(min) < 0;
	$: domain = crossesZero
		? [min, max]
		: max > 0 ? [0, max] : [min, 0];
	$: getX = linearScale(domain, [0, width]);
	$: x0 = getX(0);
	$: columnsWidth = {neg: x0, pos: width - x0};

	/* layout */
	$: bars = items.map(item => {
		const value = valueAccessor(item);
		const isNeg = value < 0;
		const label = keyToLabel && keyToLabel[item.key]
			? keyToLabel[item.key]
			: keyToLabelFn
				? keyToLabelFn(item.key)
				: item.key;
		const labelLength = label.length * averageCharWidth;

		return {...item, ...{
			barColor: keyToColor
				? keyToColor[item.key] || theme.barDefaultColor
				: keyToColorFn
					? keyToColorFn(item.key)
					: theme.barDefaultColor,
			displayValue: formatFn ? formatFn(value) : value,
			isNeg,
			label,
			labelLength,
			value,
		}}
	});
	$: labelsMaxLengths = bars.reduce((acc, {displayValue, isNeg, labelLength}) => {
		const signKey = isNeg ? 'neg' : 'pos';
		const displayValueLength = String(displayValue).length * averageCharWidth;

		acc[signKey].label = Math.max(acc[signKey].label, labelLength);
		acc[signKey].value = Math.max(acc[signKey].value, displayValueLength);

		return acc;
	}, {
		neg: {label: 0, value: 0},
		pos: {label: 0, value: 0},
	});
	$: labelsRoom = {
		neg: Math.max(0, columnsWidth.neg - labelsMaxLengths.neg.value - labelValueDistance),
		pos: Math.max(0, columnsWidth.pos - labelsMaxLengths.pos.value - labelValueDistance)
	};

	$: barsLayout = bars.map((bar, idx) => {
		let {isNeg, label, labelLength, value} = bar;

		const room = labelsRoom.neg + labelsRoom.pos;
		const overflowRatio = labelLength / room;

		if (overflowRatio > 1) {
			const cutIndex = Math.floor(room / averageCharWidth) - 1;

			label = `${sliceString(label, 0, cutIndex)}…`;
			labelLength = label.length;
		}

		return {...bar, ...{
			isLabelAlignedRight: crossesZero
				? isNeg
					? labelsMaxLengths.neg.label < labelsRoom.neg
					: labelsMaxLengths.pos.label > labelsRoom.pos
				: allNegatives,
			isValueAlignedRight: crossesZero ? !isNeg : !allNegatives,
			label,
			labelLength,
			labelX: crossesZero
				? isNeg
					? labelsMaxLengths.neg.label <= labelsRoom.neg
						? x0 - barPadding
						: labelsMaxLengths.neg.value + labelValueDistance
					: labelsMaxLengths.pos.label <= labelsRoom.pos
						? x0 + barPadding
						: width - labelsMaxLengths.pos.value - labelValueDistance
				: allNegatives ? width : 0,
			x: getX(value),
			valueX: crossesZero
				? isNeg ? 0 : width
				: allNegatives ? 0 : width,
			y: idx * itemHeight,
		}}
	});
	$: barsByKey = index(barsLayout, getKey);

	/* refs */

	$: makeRefsLayout = pipe([
		sortByValue,
		mapWith((ref, idx) => {
			const valueX = getX(ref.value);
			let formattedValue = ref.formatFn ? ref.formatFn(ref.value) : ref.value;
			let label = `${ref.key} (${formattedValue})`;
			let textLength = label.length * averageCharWidth;
			let rectWidth = textLength + 2 * theme.padding;
			let goesOff = valueX + rectWidth > width;
			let isAlignedRight = goesOff && valueX > width / 2;

			if (goesOff && ref.keyAbbr) {
				label = `${ref.keyAbbr} (${formattedValue})`;
				textLength = label.length * averageCharWidth;
				rectWidth = textLength + 2 * theme.padding;
				isAlignedRight =
					valueX + rectWidth > width
					&& valueX > width / 2;
			}

			return {
				...ref,
				isAlignedRight,
				label,
				rectWidth,
				textLength,
				textX: isAlignedRight ? -theme.padding : theme.padding,
				valueX,
				x: isAlignedRight ? -rectWidth : 0,
				y: theme.padding + idx * (theme.padding + refHeight)
			}
		})
	]);
	$: refsLayout = refs && refs.length && makeRefsLayout(refs);
	$: refHeight = theme.padding + theme.fontSize;
	$: refsHeight =
		refs && refs.length * (theme.padding + refHeight) + theme.padding
		|| 0;


	/* scroll */

	let previousItems;
	let scrollable;
	let wasNotResettingScroll;

	beforeUpdate(() => {
		wasNotResettingScroll = !shouldResetScroll
	});
	afterUpdate(() => {
		if (shouldResetScroll && items && items.length && !isEqual(previousItems, items) && scrollable) {
			scrollable.scrollTop = 0;
			previousItems = items;
		}
	});
	$: if (wasNotResettingScroll && shouldResetScroll && scrollable) {
		scrollable.scrollTop = 0;
	}

	$: focusedY =
		shouldScrollToFocusedKey
		&& focusedKey
		&& barsByKey[focusedKey]
		&& barsByKey[focusedKey].y;

	$: if (
		shouldScrollToFocusedKey
		&& focusedKey
		&& scrollable
	) {
		const yAbs = -scrollable.scrollTop + focusedY;
		if (yAbs < 0) {
			scrollable.scroll({
				top: focusedY,
				behavior: 'smooth'
			})
		} else if (yAbs + itemHeight > height) {
			scrollable.scroll({
				top: focusedY - height + itemHeight,
				behavior: 'smooth'
			})
		}
	}

	/* events */

	const onClick = key => () => {
		dispatch('clicked', {id: key})
	}
	const onMouseenter = key => () => {
		hoveredKey = key;
		isInteractive && dispatch('entered', {id: key})
	}
	const onMouseleave = key => () => {
		dispatch('exited', {id: key})
	}
</script>

<div
	{style}
	class='BarchartVDiv'
>
	{#if title}
		<header>
			<h2>{title}</h2>
		</header>
	{/if}
	<main class:titled={title} >
		{#if !items || items.length === 0}

			<div class='message'>
				<span>{message}</span>
			</div>

		{:else}

			<!-- ref labels -->
			{#if refs.length}
				<div class='refs'>
					<svg {width} height={refsHeight}>
						{#each refsLayout as {
							color,
							dasharray,
							isAlignedRight,
							label,
							linewidth,
							rectWidth,
							textLength,
							textX,
							valueX,
							x,
							y,
						}}
							<g
								class='ref'
								transform='translate({valueX}, {y})'
							>
								<rect
									{x}
									width={rectWidth}
									height={refHeight}
								/>
								<text
									class:right={isAlignedRight}
									x={textX}
									y={refHeight / 2}
									{textLength}
								>{label}</text>
								<line
									class='ref'
									stroke={color || theme.refColor}
									stroke-dasharray={dasharray || theme.refDasharray}
									stroke-width={linewidth || theme.refWidth}
									y1={refHeight}
									y2={refsHeight - y}
								/>
							</g>
						{/each}
					</svg>
				</div>
			{/if}

			<!-- scrollable -->
			<div
				bind:clientHeight={height}
				bind:clientWidth={width}
				bind:this={scrollable}
				class:withrefs={refs && refs.length}
				class='scrollable'
				on:mouseleave={() => {hoveredKey = null}}
			>
				<svg {width} height={svgHeight}>
					<rect class='bkg' {width} height={svgHeight} />

					<!-- refs lines -->
					{#if refsLayout}
						{#each refsLayout as {
							color,
							dasharray,
							linewidth,
							valueX: x,
						}}
							<line
								class='ref'
								stroke={color || theme.refColor}
								stroke-dasharray={dasharray || theme.refDasharray}
								stroke-width={linewidth || theme.refWidth}
								x1={x}
								x2={x}
								y2={svgHeight}
							/>
						{/each}
					{/if}

					<!-- bars -->
					<g>
						{#each barsLayout as {
							barColor,
							displayValue,
							isLabelAlignedRight,
							isValueAlignedRight,
							key,
							label,
							labelX,
							valueX,
							x,
							y
						}, index (key)}
							<g
								class:clickable={isInteractive}
								class:deselected={selectedKeys.length && !isIn(selectedKeys, key)}
								class='item'
								on:click={isInteractive && onClick(key)}
								on:mouseenter={onMouseenter(key)}
								on:mouseleave={isInteractive && onMouseleave(key)}
								transform='translate(0, {itemHeight * index})'
							>
								<rect
									{width}
									fill={key === focusedKey
										? theme.focusedKeyColor
										: key === hoveredKey
											? theme.hoverColor
											: transparentColor
									}
									height={itemHeight}
								/>
								<line
									stroke={barColor}
									stroke-width={barHeight}
									x1={x0}
									x2={x}
									y1={barY}
									y2={barY}
								/>
								<text
									class:right={isLabelAlignedRight}
									class='label'
									x={labelX}
									y={textY}
								>{label}</text>
								<text
									class:right={isValueAlignedRight}
									class='value'
									x={valueX}
									y={textY}
								>{displayValue}</text>
							</g>
						{/each}
					</g>

					<!-- axis -->
					{#if crossesZero}
						<line
							stroke={theme.axisColor}
							x1={x0}
							x2={x0}
							y2={svgHeight}
						/>
					{/if}

				</svg>
			</div>

		{/if} <!-- if no items -->

	</main>
</div>

<style>
	.BarchartVDiv {
		width: 100%;
		height: 100%;
		padding: var(--paddingPx);
	}

	header {
		width: 100%;
		height: var(--headerHeight);
		display: flex;
		align-items: center;
	}

	h2 {
		margin: 0;
		font-size: var(--titleFontSize);
	}

	main {
		width: 100%;
		height: 100%;
		max-height: 100%;
	}
	main.titled {
		height: calc(100% - var(--headerHeight));
		max-height: calc(100% - var(--headerHeight));
	}

	.message {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: center;
		width: 100%;
	}
	.message span {
		font-size: var(--messageFontSize);
		color: var(--messageColor);
	}

	.refs {
		width: 100%;
		height: var(--refsHeightPx);
	}

	.scrollable {
		width: 100%;
		height: calc(100% - var(--refsHeightPx));
		max-height: calc(100% - var(--refsHeightPx));
		overflow-y: auto;
	}

	.ref rect {
		stroke-width: 0.5;
		stroke: black;
		fill: white;
	}
	.ref text {
		dominant-baseline: middle;
		fill: black;
		stroke: none;
	}
	.ref text.right {
		text-anchor: end;
	}

	rect.bkg {
		fill-opacity: var(--backgroundOpacity);
		fill: var(--backgroundColor);
	}

	.item.clickable {
		cursor: pointer;
	}
	.item.deselected line {
		stroke-opacity: var(--deselectedOpacity);
	}
	.item text {
		fill: var(--textColor);
		font-size: var(--fontSize);
		stroke: none;
	}
	.item text.label.right {
		text-anchor: end;
	}
	.item text.value.right {
		text-anchor: end;
	}
</style>
