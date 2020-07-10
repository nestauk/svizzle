<script>
	import * as _ from 'lamb';
	import { linearScale } from 'yootils';
	import isEqual from 'just-compare';
	import { afterUpdate, beforeUpdate, createEventDispatcher } from 'svelte';
	import { makeStyleVars } from '@svizzle/dom';
	import { arrayMaxWith, arrayMinWith, getValue } from '@svizzle/utils';

	const dispatch = createEventDispatcher();
	const transparentColor = 'rgba(0,0,0,0)';

	const defaultTheme = {
		// exposed but undocumented
		backgroundOpacity: 1,

		// exposed and documented
		axisColor: 'grey',
		backgroundColor: transparentColor,
		barDefaultColor: 'black',
		focusedKeyColor: 'rgba(0, 0, 0, 0.1)',
		fontSize: 14,
		headerHeight: '2rem',
		hoverColor: 'rgba(0, 0, 0, 0.05)',
		padding: '10px',
		textColor: 'grey',
	};

	export let barHeight;
	export let focusedKey;
	export let formatFn;
	export let isInteractive;
	export let items;
	export let keyToColor;
	export let keyToColorFn;
	export let keyToLabel;
	export let keyToLabelFn;
	export let shouldResetScroll;
	export let theme;
	export let title;
	export let valueAccessor;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: barHeight = barHeight || 4;
	$: isInteractive = isInteractive || false;
	$: shouldResetScroll = shouldResetScroll || false;
	$: theme = theme ? _.merge(defaultTheme, theme) : defaultTheme;
	$: valueAccessor = valueAccessor || getValue;

	$: style = makeStyleVars(theme);

	let height;
	let hoveredKey;
	let width;

	$: barPadding = theme.fontSize / 2;
	$: itemHeight = theme.fontSize + barHeight + 3 * barPadding;
	$: svgHeight = itemHeight * items.length;
	$: getMin = arrayMinWith(valueAccessor);
	$: getMax = arrayMaxWith(valueAccessor);
	$: min = getMin(items);
	$: max = getMax(items);
	$: crossesZero = Math.sign(min) !== Math.sign(max);
	$: domain = crossesZero
		? [min, max]
		: max > 0 ? [0, max] : [min, 0];
	$: getX = linearScale(domain, [0, width]);
	$: x0 = getX(0);
	$: bars = items.map(item => {
		const value = valueAccessor(item);
		const isNeg = value < 0;

		return _.merge(item, {
			barColor: keyToColor
				? keyToColor[item.key] || theme.barDefaultColor
				: keyToColorFn
					? keyToColorFn(item.key)
					: theme.barDefaultColor,
			bkgColor: item.key === focusedKey
				? theme.focusedKeyColor
				: item.key === hoveredKey
					? theme.hoverColor
					: transparentColor,
			displayValue: formatFn ? formatFn(value) : value,
			dxKey: crossesZero
				? isNeg ? -barPadding : barPadding
				: 0,
			isNeg,
			label: keyToLabel && keyToLabel[item.key]
				? keyToLabel[item.key]
				: keyToLabelFn
					? keyToLabelFn(item.key)
					: item.key,
			x: getX(value),
			xValue: value > 0 ? width: 0,
			y: itemHeight - barPadding - barHeight / 2,
			yText: itemHeight - barHeight - 2 * barPadding
		})
	});

	/* scroll */

	let previousItems;
	let scrollable;
	let wasNotResettingScroll;

	beforeUpdate(() => {
		wasNotResettingScroll = !shouldResetScroll
	});
	$: afterUpdate(() => {
		if (items && shouldResetScroll && !isEqual(previousItems, items)) {
			scrollable.scrollTop = 0;
			previousItems = items;
		}
	});
	$: if (wasNotResettingScroll && shouldResetScroll && scrollable) {
		scrollable.scrollTop = 0;
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
	<main
		bind:clientWidth={width}
		bind:clientHeight={height}
		bind:this={scrollable}
		class:titled={title}
		on:mouseleave='{ () => { hoveredKey = null } }'
	>
		<svg {width} height={svgHeight}>
			<rect class='bkg' {width} {height} />
			<g>
				{#each bars as {
					barColor,
					bkgColor,
					displayValue,
					dxKey,
					isNeg,
					key,
					label,
					length,
					x,
					xValue,
					y,
					yText
				}, index (key)}
				<g
					class:clickable={isInteractive}
					class='item'
					transform='translate(0, {itemHeight * index})'
					on:click="{ () => { isInteractive && dispatch('clicked', {id: key}) } }"
					on:mouseenter="{ () => {
						isInteractive && dispatch('entered', {id: key})
						hoveredKey = key;
					} }"
					on:mouseleave="{ () => isInteractive && dispatch('exited', {id: key}) }"
				>
					<rect
						{width}
						fill={bkgColor}
						height={itemHeight}
					/>
					<line
						stroke={barColor}
						stroke-width={barHeight}
						x1={x0}
						x2={x}
						y1={y}
						y2={y}
					/>
					<text
						class:neg={isNeg}
						class='key'
						dx={dxKey}
						x={x0}
						y={yText}
					>{label}</text>
					<text
						class:neg={isNeg}
						class='value'
						x={xValue}
						y={yText}
					>{displayValue}</text>
				</g>
				{/each}
			</g>
			{#if crossesZero}
			<line
				stroke={theme.axisColor}
				x1={x0}
				x2={x0}
				y2={svgHeight}
			/>
			{/if}
		</svg>
	</main>
</div>

<style>
	.BarchartVDiv {
		width: 100%;
		height: 100%;
		padding: var(--padding);
	}

	header {
		width: 100%;
		height: var(--headerHeight);
		display: flex;
		align-items: center;
	}

	h2 {
		margin: 0;
	}

	main {
		width: 100%;
		height: 100%;
		max-height: 100%;
		overflow-y: auto;
	}
	main.titled {
		height: calc(100% - var(--headerHeight));
		max-height: calc(100% - var(--headerHeight));
	}

	rect.bkg {
		fill-opacity: var(--backgroundOpacity);
		fill: var(--backgroundColor);
	}
	.item.clickable {
		cursor: pointer;
	}

	.item text {
		fill: var(--textColor);
		font-size: var(--fontSize);
		stroke: none;
	}
	.item text.key.neg {
		text-anchor: end;
	}
	.item text.value {
		text-anchor: end;
	}
	.item text.value.neg {
		text-anchor: start;
	}
</style>
