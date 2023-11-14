<script>
	import {makeStyleVars} from '@svizzle/dom';

	import ColorBinsG from './ColorBinsG.svelte';

	// html
	export let headerHeight = null;
	export let padding = null;
	export let title = null;

	// svg
	export let bins = []; // {range: [number, number], color: string}[]
	export let flags = null;
	export let geometry = null;
	export let message = 'No data';
	export let selectedBins = [];
	export let theme = null;
	export let ticksFormatFn = null;

	$: padding = padding || '10px';
	$: headerHeight = headerHeight || '2rem';
	$: style = makeStyleVars({headerHeight, padding});

	let height = 0;
	let width = 0;
</script>

<div
	class='ColorBinsDiv'
	class:interactive={flags && flags.isInteractive}
	{style}
>
	{#if title}
		<header>
			<h2>{title}</h2>
		</header>
	{/if}
		<main
			bind:clientHeight={height}
			bind:clientWidth={width}
			class:titled={title && title.length}
		>
			<svg
				{width}
				{height}
			>
				{#if bins}
					<ColorBinsG
						{bins}
						{flags}
						{geometry}
						{height}
						{message}
						{selectedBins}
						{theme}
						{ticksFormatFn}
						{width}
						on:brushed
						on:brushend
						on:brushstart
						on:clicked
						on:entered
						on:exited
					/>
				{/if}
			</svg>
		</main>
</div>

<style>
	.ColorBinsDiv {
		width: 100%;
		height: 100%;
		padding: var(--padding);
		pointer-events: none;
	}
	.ColorBinsDiv.interactive {
		pointer-events: auto;
	}

	header {
		width: 100%;
		height: var(--headerHeight);

		display: flex;
		align-items: center;
	}
	h2 {
		margin: 0;
	}

	main {
		width: 100%;
		height: 100%;
		user-select: none;
	}
	main.titled {
		height: calc(100% - var(--headerHeight));
	}
	main svg {
		display: block;
		height: 100%;
		width: 100%;
	}
</style>
