<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();
	const defaultTheme = {
		color: 'black',
		backgroundColor: 'white',
		height: '24px',
		knobColor: 'lightgrey',
		outlineColor: 'black',
		outlineStyle: 'solid',
		outlineWidth: '1px',
	}

	// mandatory
	export let value = null;
	export let values = null;

	// optional
	export let theme = null;
	export let hideLabels = false;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: currentValue = value || values[0];

	$: isRight = currentValue === values[1];
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);
	$: title = `Select between ${values[0]} and ${values[1]}`;

	function toggle () {
		currentValue = currentValue === values[0] ? values[1] : values[0];
		dispatch('toggled', currentValue);
	}
	const onKeypress = event => {
		if (event.keyCode === 13 || event.key === ' ') {
			event.preventDefault();
			toggle();
		}
	}
</script>

<div
	{style}
	{title}
	aria-label={title}
	class='switch'
	on:keypress={onKeypress}
	role='button'
	tabindex=0
>
	{#if !hideLabels}
		<span class='labelLeft'>{values[0]}</span>
	{/if}
	<span
		class='wrapper'
		class:isRight
		on:click={toggle}
	>
		<span aria-hidden='true' class='bkg'></span>
		<span aria-hidden='true' class='knob'></span>
	</span>
	{#if !hideLabels}
		<span class='labelRight'>{values[1]}</span>
	{/if}
</div>

<style>
	.switch {
		align-items: center;
		cursor: pointer;
		display: flex;
	}
	.switch:focus-visible {
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor);
		outline-offset: calc(-1 * var(--outlineWidth));
	}

	.wrapper {
		border-radius: calc(2 * var(--height));
		border: 1px solid var(--color);
		display: inline-block;
		height: var(--height);
		position: relative;
		vertical-align: middle;
		width: calc(2 * var(--height));
	}

	.labelLeft {
		margin-right: 0.5rem;
	}
	.labelRight {
		margin-left: 0.5rem;
	}

	.knob {
		--border: 1px;
		--diameter: calc(var(--height) - 2 * var(--border));

		background: var(--knobColor);
		border-radius: calc(var(--height) / 2);
		border: 1px solid var(--color);
		display: block;
		height: var(--diameter);
		left: 0;
		position: absolute;
		right: 100%;
		top: 0;
		transition: all 0.1s ease-out;
		width: var(--diameter);
		z-index: 2;
	}

	.bkg {
		background-color: var(--backgroundColor);
		border-radius: calc(var(--height) / 2);
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transition: all 0.2s ease-out;
		width: 100%;
		z-index: 0;
	}

	.isRight .knob {
		left: 50%;
		right: 0;
	}

	.isRight .bkg {
		background-color: #fff;
	}
</style>
