<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {isNotNil} from '@svizzle/utils';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	const defaultTheme = {
		borderColor: 'black',
		borderWidth: '1px',
		selectedColor: 'black',
		selectedTextColor: 'white',
	}

	export let theme = null;
	export let value = null;
	export let values = [];

	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);

	const onClick = val => () => dispatch('changed', val);
	const onKeyDown = val => event => {
		if (['Enter', ' '].includes(event.key)) {
			event.preventDefault();
			dispatch('changed', val);
		}
	}
</script>

<div
	{style}
	class='XorSelector'
>
	{#each values as val}
		<span
			class:selected={isNotNil(value) && val === value}
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
		cursor: pointer;
		padding: 0.3rem 0.6rem;
	}
	span:first-child {
		border-left: var(--border);
		border-radius: 100% 0 0 100%;
	}
	span:last-child {
		border-radius: 0 100% 100% 0;
	}
	span.selected {
		background-color: var(--selectedColor);
		color: var(--selectedTextColor);
	}
</style>
