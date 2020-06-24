<script>
	import HistogramG from './HistogramG.svelte';

	// html
	export let title;

	// svg
	export let bins;
	export let binsFill;
	export let flags;
	export let geometry;
	export let selectedBins;
	export let theme;
	export let ticksFormatFn;

	let height = 0;
	let width = 0;
</script>

<div
	class='histogram'
	class:interactive={flags && flags.isInteractive}
>
	{#if title}
	<header class:rightToLeft={flags && flags.isRightToLeft}>
		<h2>{title}</h2>
	</header>
	{/if}
	<main
		bind:clientWidth={width}
		bind:clientHeight={height}
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
	.histogram {
		--header-height: 2em;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.histogram.interactive {
		pointer-events: auto;
	}

	header {
		width: 100%;
		height: var(--header-height);

		display: flex;
		align-items: center;
	}
	header.rightToLeft {
		justify-content: flex-end;
	}

	main {
		width: 100%;
		height: 100%;
		user-select: none;
	}
	main.titled {
		height: calc(100% - var(--header-height));
	}
	main svg {
		width: 100%;
		height: 100%;
	}
</style>
