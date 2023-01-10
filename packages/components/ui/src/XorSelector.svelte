<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	const defaultTheme = {
		borderColor: 'black',
		borderRadius: 0,
		borderWidth: '1px',
		selectedColor: 'black',
		selectedTextColor: 'white',
		textColor: 'black',
	}

	export let theme = null;
	export let value = null;
	export let values = [];

	$: currentValue = value ?? values[0];

	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: borderRadiusLeft = `${theme.borderRadius} 0 0 ${theme.borderRadius}`;
	$: borderRadiusRight = `0 ${theme.borderRadius} ${theme.borderRadius} 0`;
	$: style = makeStyleVars({
		...theme,
		borderRadiusLeft,
		borderRadiusRight,
	});

	const updateValue = val => {
		currentValue = val;
		dispatch('changed', val);
	}
	const onClick = val => () => updateValue(val);
	const onKeyDown = val => event => {
		if (['Enter', ' '].includes(event.key)) {
			event.preventDefault();
			updateValue(val);
		}
	}
</script>

<div
	{style}
	class='XorSelector'
>
	{#each values as val}
		<span
			class:selected={currentValue === val}
			on:click={onClick(val)}
			on:keydown={onKeyDown(val)}
		>
			{val}
		</span>
	{/each}
</div>

<style>
	.XorSelector {
		--border: var(--borderWidth) solid var(--borderColor);
		align-items: center;
		display: flex;
		padding: 0.1rem;
		user-select: none;
	}

	span {
		border-bottom: var(--border);
		border-right: var(--border);
		border-top: var(--border);
		color: var(--textColor);
		cursor: pointer;
		padding: 0.3rem 0.6rem;
	}
	span:first-child {
		border-left: var(--border);
		border-radius: var(--borderRadiusLeft);
	}
	span:last-child {
		border-radius: var(--borderRadiusRight);
	}
	span.selected {
		background-color: var(--selectedColor);
		color: var(--selectedTextColor);
	}
</style>
