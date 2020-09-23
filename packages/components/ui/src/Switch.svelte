<script>
	import {createEventDispatcher} from 'svelte';
	import {makeStyleVars} from '@svizzle/dom';
	import uid from 'uid';

	const dispatch = createEventDispatcher();
	const defaultTheme = {
		height: '24px',
		color: 'grey',
		backgroundColor: 'white',
		knobColor: 'lightgrey'
	}

	// mandatory
	export let value;
	export let values;

	// optional
	export let theme;
	export let hideLabels;

	const id = uid();

	$: currentValue = value || values[0];
	$: isRight = currentValue === values[1];
	$: theme = {...defaultTheme, ...theme};
	$: style = makeStyleVars(theme);

	function toggle() {
		currentValue = currentValue === values[0] ? values[1] : values[0];
		dispatch('toggled', currentValue);
	}
</script>

<div class='switch' {style} on:click={toggle}>
	<fieldset role='radiogroup'>
		{#if !hideLabels}
			<label
				for='left-{id}'
				class:greyed={currentValue !== values[0]}
			>{values[0]}</label>
		{/if}
		<span class='wrapper' class:isRight>
			<input
				type='radio'
				id='left-{id}'
				bind:group={currentValue}
				value='{values[0]}'
			>
			<input
				type='radio'
				id='right-{id}'
				bind:group={currentValue}
				value='{values[1]}'
			>
			<span aria-hidden='true' class='bkg'></span>
			<span aria-hidden='true' class='knob'></span>
		</span>
		{#if !hideLabels}
			<label
				for='right-{id}'
				class:greyed={currentValue !== values[1]}
			>{values[1]}</label>
		{/if}
	</fieldset>
</div>

<style>
	fieldset {
		border: none;
		user-select: none;
		padding: 0;
	}

	.switch {
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.switch label {
		font-size: 16px;
		margin: 0 .5em 0;
	}
	.switch label.greyed {
		opacity: 0.5;
	}
	.switch input[type='radio'] {
		display: inline-block;
		margin-right: -2px;
		width: 50%;
		height: 100%;
		opacity: 0;
		position: relative;
		z-index: 1;
		cursor: pointer;
	}

	.wrapper {
		display: inline-block;
		vertical-align: middle;
		width: calc(2 * var(--height));
		height: var(--height);
		border-radius: calc(2 * var(--height));
		border: 1px solid var(--color);
		position: relative;
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
		right: 0;
		left: 50%;
	}

	.isRight .bkg {
		background-color: #fff;
	}
</style>
