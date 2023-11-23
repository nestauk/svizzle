<script>
	import {makeStyleVars, toPx} from '@svizzle/dom';
	import {isNotNil} from '@svizzle/utils';
	import * as _ from 'lamb';
	import {createEventDispatcher} from 'svelte';

	import ChevronLeft from './icons/feather/ChevronLeft.svelte';
	import ChevronRight from './icons/feather/ChevronRight.svelte';
	import Icon from './icons/Icon.svelte';

	export let currentValue;
	export let label = null;
	export let theme;
	export let valuesToLabels;

	const defaultTheme = {
		border: 'solid 1px black',
		colorBackground: 'white',
		colorIcon: 'black',
		colorIconDisabled: 'grey',
		textColor: 'black',
		outlineColor: 'black',
		outlineStyle: 'solid',
		outlineWidth: '1px',
	}
	const dispatch = createEventDispatcher();
	const updateValue = val => {
		currentValue = val;
		dispatch('changed', val);
	}
	const onKeyDown = (event, val) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			updateValue(val);
		}
	}

	let height;

	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars({...theme, height: toPx(height)});
	$: values = _.keys(valuesToLabels);
	$: currentLabel = valuesToLabels[currentValue];
	$: currentValueIndex = _.findIndex(values, _.is(currentValue));
	$: prevValue = values[currentValueIndex - 1];
	$: nextValue = values[currentValueIndex + 1];
	$: hasPrevValue = isNotNil(prevValue);
	$: hasNextValue = isNotNil(nextValue);
	$: clickedPrev = () => hasPrevValue && updateValue(prevValue);
	$: clickedNext = () => hasNextValue && updateValue(nextValue);
	$: onKeyDownPrev = event => hasPrevValue && onKeyDown(event, prevValue);
	$: onKeyDownNext = event => hasNextValue && onKeyDown(event, nextValue);
</script>

<div
	{style}
	class='XorNavigator'
>
	{#if label}
		<div>{label}</div>
	{/if}
	<div
		class='navigator'
		bind:offsetHeight={height}
	>
		<div class='currentLabel'>{currentLabel}</div>
		<button
			aria-label='Previous value'
			class:clickable={hasPrevValue}
			class='prev'
			disabled={!hasPrevValue}
			on:click={clickedPrev}
			on:keydown={onKeyDownPrev}
		>
			<Icon glyph={ChevronLeft} />
		</button>
		<button
			aria-label='Next value'
			class:clickable={hasNextValue}
			class='next'
			disabled={!hasNextValue}
			on:click={clickedNext}
			on:keydown={onKeyDownNext}
		>
			<Icon glyph={ChevronRight} />
		</button>
	</div>
</div>

<style>
	.XorNavigator {
		display: grid;
		grid-template-rows: min-content min-content;
		height: 100%;
		user-select: none;
		width: 100%;
	}

	.navigator {
		align-items: center;
		border: var(--border);
		display: grid;
		grid-template-columns: 1fr min-content min-content;
		height: 100%;
		width: 100%;
	}

	.currentLabel {
		color: var(--textColor);
		display: block;
		flex: 1;
		overflow: hidden;
		padding: 0.5em 1em;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	button {
		background: var(--colorBackground);
		border: none;
		border-left: var(--border);
		color: var(--colorIcon);
		cursor: pointer;
		height: 100%;
		width: var(--height);
	}
	button:disabled {
		color: var(--colorIconDisabled);
		cursor: default;
	}
	button:focus-visible {
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor);
		outline-offset: calc(-1 * var(--outlineWidth));
	}
</style>
