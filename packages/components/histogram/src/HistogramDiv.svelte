<script>
	import {makeStyleVars} from '@svizzle/dom';

	import HistogramG from './HistogramG.svelte';

	// html
	export let headerHeight;
	export let padding;
	export let title;

	// svg
	export let bins = [];
	export let binsFill = null;
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
	class='HistogramDiv'
	class:interactive={flags && flags.isInteractive}
	{style}
>
	{#if title}
		<header class:rightToLeft={flags && flags.isRightToLeft}>
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
				<HistogramG
					{bins}
					{binsFill}
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
	.HistogramDiv {
		width: 100%;
		height: 100%;
		padding: var(--padding);
		pointer-events: none;
	}
	.HistogramDiv.interactive {
		pointer-events: auto;
	}

	header {
		width: 100%;
		height: var(--headerHeight);

		display: flex;
		align-items: center;
	}
	header.rightToLeft {
		justify-content: flex-end;
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
		width: 100%;
		height: 100%;
	}
</style>
