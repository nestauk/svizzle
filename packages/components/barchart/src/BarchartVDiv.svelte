<script>
	import {makeStyleVars, toPx} from '@svizzle/dom';
	import {MessageView, Scroller} from '@svizzle/ui';
	import {
		applyFnMap,
		arrayMaxWith,
		arrayMinWith,
		getKey,
		getValue,
		isIterableEmpty,
		sliceString,
	} from '@svizzle/utils';
	import isEqual from 'just-compare';
	import {
		always,
		identity,
		index,
		isIn,
		mapWith,
		pipe,
		sortWith,
		when,
	} from 'lamb';
	import {
		afterUpdate,
		beforeUpdate,
		createEventDispatcher
	} from 'svelte';
	import {linearScale} from 'yootils';

	const dispatch = createEventDispatcher();
	const sortByValue = sortWith([getValue]);
	const transparentColor = 'rgba(0,0,0,0)';

	const getCssGeometry = applyFnMap({
		glyphHeightPx: pipe([x => x.glyphHeight, toPx]),
		headerHeight: x => x.headerHeight,
		paddingPx: pipe([x => x.padding, toPx]),
	});

	const defaultGeometry = {
		glyphHeight: 14,
		glyphWidth: 7,
		headerHeight: '2em',
		padding: 10,
	};
	const defaultTheme = {
		axisColor: 'lightgrey',
		backgroundColor: transparentColor,
		backgroundOpacity: 1, // undocumented
		itemBackgroundColorHero: 'yellow',
		itemBackgroundColorHover: 'lightgrey',
		itemBackgroundColorSelected: 'cyan',
		itemBarColorDefault: 'black',
		itemBarColorHero: null,
		itemBarColorHover: null,
		itemBarColorSelected: null,
		itemTextColorDefault: '#333',
		itemTextColorHero: 'black',
		itemTextColorHover: '#333',
		itemTextColorSelected: 'black',
		messageColor: 'black',
		messageFontSize: '1rem',
		outlineColor: 'black',
		outlineStyle: 'solid',
		outlineWidth: '1px',
		refColor: 'grey',
		refDasharray: '4 4',
		refRectColor: 'black',
		refRectStrokeColor: 'white',
		refTextFill: 'black',
		refWidth: 0.5,
		titleFontSize: '1.5em',
	};

	const zeroIfNaN = when(isNaN, always(0));

	export let barHeight = 4;
	export let formatFn;
	export let heroKey = null;
	export let geometry;
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
	export let shouldScrollToHeroKey = false;
	export let theme = null;
	export let title = null;
	export let valueAccessor = null;
	export let valueToColorFn = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: barHeight = barHeight || 4;
	$: formatFn = formatFn ?? identity;
	$: isInteractive = isInteractive || false;
	$: items = items || [];
	$: message = message || 'No data';
	$: refs = refs || [];
	$: selectedKeys = selectedKeys || [];
	$: shouldResetScroll = shouldResetScroll || false;
	$: geometry = geometry ? {...defaultGeometry, ...geometry} : defaultGeometry;
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: valueAccessor = valueAccessor || getValue;

	let height;
	let hoveredKey;
	let scrollbarWidth;
	let width;

	$: style = makeStyleVars({
		...theme,
		...getCssGeometry(geometry),
		refsHeightPx: toPx(refsHeight)
	});
	$: availableWidth = width - scrollbarWidth;
	$: barPadding = geometry.glyphWidth;
	$: labelValueDistance = 3 * barPadding;
	$: itemHeight = geometry.glyphHeight + barHeight + 3 * barPadding;
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
	$: getX = pipe([
		linearScale(domain, [0, availableWidth]),
		zeroIfNaN
	]);
	$: x0 = getX(0);
	$: columnsWidth = {neg: x0, pos: availableWidth - x0};

	/* layout */

	// eslint-disable-next-line complexity
	$: bars = items.map(item => {
		const {key} = item;

		/* label */

		const label = keyToLabel && keyToLabel[key]
			? keyToLabel[key]
			: keyToLabelFn
				? keyToLabelFn(key)
				: key;
		const labelLength = label.length * geometry.glyphWidth;

		/* value */

		const value = valueAccessor(item);
		const isNeg = value < 0;
		const displayValue = formatFn ? formatFn(value) : value;

		/* colors */

		const isItemDeselected =
			isIterableEmpty(selectedKeys)
				? true
				: !isIn(selectedKeys, key);

		// bkg color: hoveredKey || heroKey || selectedKeys || transparentColor

		const barBackgroundColor =
			key === hoveredKey
				? theme.itemBackgroundColorHover
				: key === heroKey
					? theme.itemBackgroundColorHero
					: isItemDeselected
						? transparentColor
						: theme.itemBackgroundColorSelected;

		// bar color: hoveredKey || heroKey || selectedKeys || key color || default

		const barBaseColor =
			keyToColor
				? keyToColor[key] || theme.itemBarColorDefault
				: keyToColorFn
					? keyToColorFn(key)
					: valueToColorFn
						? valueToColorFn(value)
						: theme.itemBarColorDefault;
		const barColor =
			key === hoveredKey
				? theme.itemBarColorHover || barBaseColor
				: key === heroKey
					? theme.itemBarColorHero || barBaseColor
					: isItemDeselected
						? barBaseColor
						: theme.itemBarColorSelected || barBaseColor;

		// text: hoveredKey || heroKey || selectedKeys || default

		const textColor =
			key === hoveredKey
				? theme.itemTextColorHover
				: key === heroKey
					? theme.itemTextColorHero
					: isItemDeselected
						? theme.itemTextColorDefault
						: theme.itemTextColorSelected;

		const payload = {displayValue, key, label, value};

		return {...item, ...{
			barBackgroundColor,
			barColor,
			displayValue,
			isNeg,
			label,
			labelLength,
			payload,
			textColor,
			value,
		}}
	});
	$: labelsMaxLengths = bars.reduce((acc, {displayValue, isNeg, labelLength}) => {
		const signKey = isNeg ? 'neg' : 'pos';
		const displayValueLength = String(displayValue).length * geometry.glyphWidth;

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

		const x = getX(value);
		const barWidth = Math.abs(x - x0);
		const barX = x >= x0 ? x0 : x;

		const room = labelsRoom.neg + labelsRoom.pos;
		const overflowRatio = labelLength / room;

		if (overflowRatio > 1) {
			const cutIndex = Math.floor(room / geometry.glyphWidth) - 1;

			label = `${sliceString(label, 0, cutIndex)}…`;
			labelLength = label.length;
		}

		return {...bar, ...{
			barWidth,
			barX,
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
						: availableWidth - labelsMaxLengths.pos.value - labelValueDistance
				: allNegatives ? availableWidth : 0,
			valueX: crossesZero
				? isNeg ? 0 : availableWidth
				: allNegatives ? 0 : availableWidth,
			x,
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
			let textLength = label.length * geometry.glyphWidth;
			let rectWidth = textLength + 2 * geometry.padding;
			let goesOff = valueX + rectWidth > availableWidth;
			let isAlignedRight = goesOff && valueX > availableWidth / 2;

			if (goesOff && ref.keyAbbr) {
				label = `${ref.keyAbbr} (${formattedValue})`;
				textLength = label.length * geometry.glyphWidth;
				rectWidth = textLength + 2 * geometry.padding;
				isAlignedRight =
					valueX + rectWidth > availableWidth
					&& valueX > availableWidth / 2;
			}

			return {
				...ref,
				isAlignedRight,
				label,
				rectWidth,
				textLength,
				textX: isAlignedRight ? -geometry.padding : geometry.padding,
				valueX,
				x: isAlignedRight ? -rectWidth : 0,
				y: geometry.padding + idx * (geometry.padding + refHeight)
			}
		})
	]);
	$: refsLayout = refs && refs.length && makeRefsLayout(refs);
	$: refHeight = geometry.padding + geometry.glyphHeight;
	$: refsHeight =
		refs && refs.length * (geometry.padding + refHeight) + geometry.padding
		|| 0;

	/* scroll */

	let outerScrollTop;
	let previousItems;
	let wasNotResettingScroll;

	const doScroll = () => {
		const yAbs = -outerScrollTop + heroY;
		if (yAbs < 0) {
			outerScrollTop = heroY;
		} else if (yAbs + itemHeight > height) {
			outerScrollTop = heroY - height + itemHeight;
		}
	}

	beforeUpdate(() => {
		wasNotResettingScroll = !shouldResetScroll
	});
	afterUpdate(() => {
		if (shouldResetScroll && items && items.length && !isEqual(previousItems, items)) {
			outerScrollTop = 0;
			previousItems = items;
		}
	});

	$: if (wasNotResettingScroll && shouldResetScroll) {
		outerScrollTop = 0;
	}

	$: heroY =
		shouldScrollToHeroKey
		&& heroKey
		&& barsByKey[heroKey]
		&& barsByKey[heroKey].y;

	$: if (shouldScrollToHeroKey && heroKey) {
		doScroll();
	}

	/* events */

	const onClick = payload => () => {
		dispatch('clicked', payload)
	}
	const onKeyDown = (event, payload) => {
		if (['Enter', ' '].includes(event.key)) {
			event.preventDefault();
			dispatch('clicked', payload);
		}
	}
	const onMouseenter = payload => () => {
		hoveredKey = payload.key;
		isInteractive && dispatch('entered', payload);
	}
	const onMouseleave = payload => () => {
		dispatch('exited', payload);
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

			<MessageView
				color={theme.messageColor}
				fontSize={theme.messageFontSize}
				textAlign='center'
				text={message}
			/>

		{:else}

			<!-- ref labels -->
			{#if refs.length}
				<div class='refs'>
					<svg width={availableWidth} height={refsHeight}>
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
				class:withrefs={refs && refs.length}
				class='scrollable'
				on:mouseleave={() => {hoveredKey = null}}
				role='none'
			>
				<Scroller
					bind:outerScrollTop
					bind:scrollbarWidth
				>
					<svg width={availableWidth} height={svgHeight}>
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
								barBackgroundColor,
								barColor,
								barWidth,
								barX,
								displayValue,
								isLabelAlignedRight,
								isValueAlignedRight,
								key,
								label,
								labelX,
								payload,
								textColor,
								valueX,
							}, index (key)}
								<!-- eslint seems to throw whatever dynamic value we use -->
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<g
									class:clickable={isInteractive}
									class='item'
									on:click={isInteractive && onClick(payload)}
									on:mouseenter={onMouseenter(payload)}
									on:mouseleave={isInteractive && onMouseleave(payload)}
									on:keydown={isInteractive && (e => onKeyDown(e, payload))}
									role={isInteractive ? 'button' : null}
									tabindex={isInteractive ? 0 : -1}
									transform='translate(0, {itemHeight * index})'
								>
									<rect
										{width}
										fill={barBackgroundColor}
										height={itemHeight}
									/>
									<rect
										fill={barColor}
										height={barHeight}
										x={barX}
										y={barY}
										width={barWidth}
									/>
									<text
										class:right={isLabelAlignedRight}
										class='label'
										fill={textColor}
										stroke='none'
										x={labelX}
										y={textY}
									>{label}</text>
									<text
										class:right={isValueAlignedRight}
										class='value'
										fill={textColor}
										x={valueX - 2}
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
				</Scroller>
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
		stroke: var(--refRectColor);
		fill: var(--refRectStrokeColor);
	}
	.ref text {
		dominant-baseline: middle;
		fill: var(--refTextFill);
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
		user-select: none;
	}
	.item text {
		font-size: var(--glyphHeightPx);
		stroke: none;
	}
	.item text.label.right {
		text-anchor: end;
	}
	.item text.value.right {
		text-anchor: end;
	}
	.item:focus-visible {
		outline: none;
	}
	.item:focus-visible .value {
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor);
		outline-offset: calc(-1 * var(--outlineWidth));
	}
</style>
