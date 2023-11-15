<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {createEventDispatcher, onMount} from 'svelte';

	import {Icon, X} from './icons';

	export let ariaLabel = 'Clear text';
	export let autofocus = false;
	export let placeholder;
	export let type = 'text';
	export let value;
	export let theme;

	const defaultTheme = {
		backgroundColor: 'transparent',
		borderColor: 'rgb(70, 70, 70)',
		colorIcon: 'lightgrey',
		colorText: 'black',
		outline: '1px solid',
	};

	let input;

	const dispatch = createEventDispatcher();

	const onInput = e => {
		const tValue = e.target.value;
		if (value !== tValue) {
			value = tValue;
		}
	};

	const onKeyPress = event => {
		if (event.keyCode === 13) {
			event.preventDefault();
			dispatch('submitted');
		}
	};

	const resetValue = () => {
		input.value = '';
		value = '';
	};

	onMount(() => {
		// https://github.com/sveltejs/sapper/issues/619#issuecomment-480616597
		// FIXME check with screen readers
		if (autofocus) {
			setTimeout(() => {
				input.focus();
			}, 100);
		}
	});

	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);

	$: input && (input.value = value);
</script>

<div
	{style}
	class='Input'
>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		aria-label={placeholder}
		{autofocus}
		{placeholder}
		{type}
		bind:this={input}
		on:input={onInput}
		on:keypress={onKeyPress}
	/>
	{#if value !== ''}
		<button
			aria-label={ariaLabel}
			class='clickable'
			on:click={resetValue}
		>
			<Icon
				glyph={X}
				size={16}
				strokeWidth={1}
				stroke={theme.colorIcon}
			/>
		</button>
	{/if}
</div>

<style>
	.Input {
		background: var(--backgroundColor);
		border: thin solid;
		border-color: var(--borderColor);
		border-radius: 0.125em;
		display: grid;
		grid-template-columns: 1fr min-content;
		padding: 0.25em;
		width: 100%;
	}

	.Input:focus-within {
		outline: var(--outline);
	}

	input {
		background: none;
		border: none;
		color: var(--colorText);
		font-size: 1em;
		width: 100%;
	}
	input:focus {
		border: none;
		outline: none;
	}

	button {
		background: none;
		border: none;
		width: 24px;
	}
</style>
