<script context='module'>
	const allChars = Object.freeze(
		'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	);
</script>

<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {createEventDispatcher} from 'svelte';

	export let chars;
	export let enabledChars;
	export let theme;

	const dispatch = createEventDispatcher();

	const defaultTheme = {
		backgroundColor: '#333',
		backgroundColorDisabled: '#333',
		focusOutline: '2px auto',
		focusOutlineOffset: '2px',
		textColor: 'white',
		textColorDisabled: 'silver'
	};

	$: chars = chars || allChars;
	$: enabledChars = enabledChars || [];
	$: theme = {...defaultTheme, ...theme};
	$: style = makeStyleVars(theme);
</script>

<nav
	{style}
	class='AlphabetPicker'
>
	{#each chars as char}
		<input
			disabled={!enabledChars.includes(char)}
			on:click={() => dispatch('charSelected', char)}
			type='button'
			value={char}
		/>
	{/each}
</nav>

<style>
	nav {
		display: grid;
	}
	input {
		background-color: var(--backgroundColor);
		border: none;
		color: var(--textColor);
		cursor: pointer;
		padding: 0 0.5em;
		text-align: center;
		width: 2em;
	}
	input:disabled {
		background-color: var(--backgroundColorDisabled);
		color: var(--textColorDisabled);
		cursor: inherit;
	}
	input:focus-visible {
		outline: var(--outline);
		outline-offset: calc(-1 * var(--focusOutlineOffset));
	}
</style>
