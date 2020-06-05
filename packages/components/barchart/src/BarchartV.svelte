<script>
	import * as _ from 'lamb';
	import { linearScale } from 'yootils';
	import isEqual from 'just-compare';
	import { afterUpdate, beforeUpdate, createEventDispatcher } from 'svelte';
	import { makeStyle } from '@svizzle/dom';
	import { arrayMaxWith, arrayMinWith, getValue } from '@svizzle/utils';

	const dispatch = createEventDispatcher();
	const transparentColor = 'rgba(0,0,0,0)';

	export let axisColor;
	export let backgroundColor;
	export let barDefaultColor;
	export let barHeight;
	export let focusedKey;
	export let focusedKeyColor;
	export let fontSize;
	export let formatFn;
	export let hoverColor;
	export let isInteractive;
	export let items;
	export let keyToColor;
	export let keyToColorFn;
	export let keyToLabel;
	export let keyToLabelFn;
	export let shouldResetScroll;
	export let textColor;
	export let title;
	export let valueAccessor;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: axisColor = axisColor || 'grey';
	$: backgroundColor = backgroundColor || transparentColor;
	$: barDefaultColor = barDefaultColor || 'black';
	$: barHeight = barHeight || 4;
	$: focusedKeyColor = focusedKeyColor || 'rgba(0, 0, 0, 0.1)';
	$: fontSize = fontSize || 14;
	$: hoverColor = hoverColor || 'rgba(0, 0, 0, 0.05)';
	$: isInteractive = isInteractive || false;
	$: shouldResetScroll = shouldResetScroll || false;
	$: textColor = textColor || 'grey';
	$: title = title || undefined;
	$: valueAccessor = valueAccessor || getValue;

	let width;
	let hoveredKey;

	$: divStyle = makeStyle({'background-color': backgroundColor});
	$: padding = fontSize / 2;
	$: itemHeight = fontSize + barHeight + 3 * padding;
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
				? keyToColor[item.key] || barDefaultColor
				: keyToColorFn
					? keyToColorFn(item.key)
					: barDefaultColor,
			bkgColor: item.key === focusedKey
				? focusedKeyColor
				: item.key === hoveredKey
					? hoverColor
					: transparentColor,
			displayValue: formatFn ? formatFn(value) : value,
			dxKey: crossesZero
				? isNeg ? -padding : padding
				: 0,
			isNeg,
			label: keyToLabel && keyToLabel[item.key]
				? keyToLabel[item.key]
				: keyToLabelFn
					? keyToLabelFn(item.key)
					: item.key,
			x: getX(value),
			xValue: value > 0 ? width: 0,
			y: itemHeight - padding - barHeight / 2,
			yText: itemHeight - barHeight - 2 * padding
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
	class='BarchartV'
	style={divStyle}
>
	{#if title}
	<header>
		<h2>{title}</h2>
	</header>
	{/if}
	<main
		bind:clientWidth={width}
		bind:this={scrollable}
		class:titled={title}
		on:mouseleave='{ () => { hoveredKey = null } }'
	>
		<svg {width} height={svgHeight}>
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
				class:clickable='{isInteractive}'
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
					fill={textColor}
					font-size={fontSize}
					x={x0}
					y={yText}
				>{label}</text>
				<text
					class:neg={isNeg}
					class='value'
					fill={textColor}
					font-size={fontSize}
					x={xValue}
					y={yText}
				>{displayValue}</text>
			</g>
			{/each}
			{#if crossesZero}
			<line
				stroke={axisColor}
				x1={x0}
				x2={x0}
				y2={svgHeight}
			/>
			{/if}
		</svg>
	</main>
</div>

<style>
	.BarchartV {
		--BarchartV_headerHeight: 2em;

		width: 100%;
		height: 100%;
		padding: 10px; /* FIXME use a variable to align with other content */
	}

	.BarchartV header {
		width: 100%;
		height: var(--BarchartV_headerHeight);
		display: flex;
		align-items: center;
	}

	.BarchartV main {
		width: 100%;
		height: 100%;
		max-height: 100%;
		overflow-y: auto;
	}

	.BarchartV main.titled {
		height: calc(100% - var(--BarchartV_headerHeight));
		max-height: calc(100% - var(--BarchartV_headerHeight));
	}

	svg .item.clickable {
		cursor: pointer;
	}

	svg .item text {
		stroke: none;
	}
	svg .item text.key.neg {
		text-anchor: end;
	}
	svg .item text.value {
		text-anchor: end;
	}
	svg .item text.value.neg {
		text-anchor: start;
	}
</style>
