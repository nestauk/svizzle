<script>
	import {makeStyleVars} from '@svizzle/dom';

	const defaultTheme = {
		outlineColor: 'black',
		outlineStyle: 'solid',
		outlineWidth: '1px',
	};

	export let checked = true;
	export let title;
	export let theme = defaultTheme;

	$: checked = checked || false;
	$: title = title || 'Toggle';
	$: theme = theme? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);
</script>

<div
	{style}
	class='ToggleControl'
>
	<input
		bind:checked
		id='toggle'
		type='checkbox'
	/>
	<label for='toggle'>{title}</label>
</div>

<style>
	.ToggleControl {
		align-items: center;
		background: white;
		border-radius: 4px;
		color: black;
		column-gap: 0.5em;
		display: grid;
		grid-auto-flow: column;
		justify-content: flex-start;
		padding: 0.25em 0.5em;
		user-select: none;
	}
	.ToggleControl * {
		cursor: pointer;
	}

	div:has(:focus-visible) {
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor);
		outline-offset: calc(-1 * var(--outlineWidth));
	}
	input:focus-visible {
		outline: none;
	}
</style>
