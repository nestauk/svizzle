<script>
	import {makeStyleVars} from '@svizzle/dom';

	import ChoroplethG from './ChoroplethG.svelte';

	// html
	export let headerHeight;
	export let padding;
	export let title;

	// ChoroplethG: required
	export let topojson;
	export let topojsonId;

	// ChoroplethG: optional
	export let geometry;
	export let isInteractive;
	export let key_alt;
	export let key;
	export let keyToColor;
	export let keyToColorFn;
	export let projection;
	export let selectedKeys;
	export let theme;

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
				{height}
				{geometry}
				{isInteractive}
				{key}
				{key_alt}
				{keyToColor}
				{keyToColorFn}
				{projection}
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
		width: 100%;
		height: 100%;
	}
</style>
