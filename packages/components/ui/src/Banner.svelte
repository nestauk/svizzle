<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {createEventDispatcher} from 'svelte';

	const defaultTheme = {
		border: 'thin solid rgb(70, 70, 70)',
		borderRadius: '1rem',
		colorBackdropSensor: 'rgba(0, 0, 0, 0.25)',
		colorBackground: 'white',
		colorBoxShadow: 'lightgrey',
		colorText: 'black',
		padding: '0.5rem',
		shadowGeometry: '2px 8px 9px -4px',
		zIndex: 2000,
	};

	export let _screen;
	export let hasBackdrop = true;
	export let isNarrow = true;
	export let theme;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
	const onKeyDown = event => {
		// ESC
		if (event.keyCode === 27) {
			event.preventDefault();
			close();
		}
	}

	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);
</script>

<svelte:window on:keydown={onKeyDown} />

<div
	{style}
	aria-label='Banner'
	class:backdrop={hasBackdrop}
	class='Banner {$_screen?.classes}'
	on:click={close}
	role='alert'
>
	<div
		class:narrow={isNarrow}
		class='inner'
		on:click|stopPropagation
	>
		<slot />
	</div>
</div>

<style>
	.Banner {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		user-select: none;
		width: 100%;
		z-index: var(--zIndex);
	}
	.Banner.backdrop {
		background-color: var(--colorBackdropSensor);
		cursor: pointer;
	}
	.inner {
		background: var(--colorBackground);
		border: var(--border);
		border-radius: var(--borderRadius);
		box-shadow: var(--shadowGeometry) var(--colorBoxShadow);
		color: var(--colorText);
		cursor: initial;
		left: 50%;
		max-height: 90%;
		padding: var(--padding);
		position: absolute;
		overflow: auto;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
	.medium .inner {
		min-width: 50%;
	}
	.medium .narrow {
		width: min-content;
	}
</style>
