<script>
	import {makeStyleVars} from '@svizzle/dom';

	import ChoroplethG from './ChoroplethG.svelte';

	// html
	export let headerHeight;
	export let padding;
	export let title;

	// ChoroplethG: required
	export let topojson = null;
	export let topojsonId = null;

	// ChoroplethG: one of the two is required
	export let key = null;
	export let key_alt = null;

	// ChoroplethG: optional
	export let focusedKey = null;
	export let geometry = null;
	export let isInteractive = false;
	export let keyToColor = null;
	export let keyToColorFn = null;
	export let message = null;
	export let projection = null;
	export let projectionFn = null;
	export let projectionId = null;
	export let selectedKeys = [];
	export let theme = null;

	$: padding = padding || '10px';
	$: headerHeight = headerHeight || '2rem';
	$: style = makeStyleVars({headerHeight, padding});

	let height = 0;
	let width = 0;
</script>

<div
	class='ChoroplethDiv'
	class:interactive={isInteractive}
	{style}
>
	{#if title}
		<header>
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
			<ChoroplethG
				{focusedKey}
				{geometry}
				{height}
				{isInteractive}
				{key_alt}
				{key}
				{keyToColor}
				{keyToColorFn}
				{message}
				{projection}
				{projectionFn}
				{projectionId}
				{selectedKeys}
				{theme}
				{topojson}
				{topojsonId}
				{width}
				on:clicked
				on:entered
				on:exited
			/>
		</svg>
	</main>
</div>

<style>
	.ChoroplethDiv {
		width: 100%;
		height: 100%;
		padding: var(--padding);
		pointer-events: none;
	}
	.ChoroplethDiv.interactive {
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
