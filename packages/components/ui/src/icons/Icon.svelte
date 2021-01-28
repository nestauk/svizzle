<script>
	import {
		fill as _fill,
		height as _height,
		stroke as _stroke,
		strokeLinecap,
		strokeLinejoin,
		strokeWidth as _strokeWidth,
		svgXmlns,
		viewBox,
		width as _width,
	} from './config';

	export let fill = _fill;
	export let height = _height;
	export let stroke = _stroke;
	export let strokeWidth = _strokeWidth;
	export let width = _width;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: fill = fill || _fill;
	$: height = height || _height;
	$: stroke = stroke || _stroke;
	$: strokeWidth = strokeWidth || _strokeWidth;
	$: width = width || _width;
</script>

<div>
	<svg
		{fill}
		{height}
		{stroke}
		{svgXmlns}
		{viewBox}
		{width}
		stroke-linecap={strokeLinecap}
		stroke-linejoin={strokeLinejoin}
		stroke-width={strokeWidth}
	>
		<slot></slot>
	</svg>
</div>

<style>
	div {
		display: inline-flex;
		vertical-align: middle;
	}

	svg {
		pointer-events: none;
	}
</style>
