<script>
	import {getContext} from 'svelte';

	export let isInteractive = true;
	export let order;

	const {_map} = getContext('mapBox');

	let customLayer;

	const mapglLayer = node => {
		const canvasContainer = $_map.getCanvasContainer();
		canvasContainer.append(node);

		return () => {
			canvasContainer.remove(node);
		};
	};
</script>

<svg
	bind:this={customLayer}
	class:disabled={!isInteractive}
	class='SvgLayers'
	style='z-index: {order}'
	use:mapglLayer
>
	<slot />
</svg>

<style>
	.SvgLayers {
		height: 100%;
		position: absolute;
		width: 100%;
	}
	.disabled {
		pointer-events: none;
	}
</style>
