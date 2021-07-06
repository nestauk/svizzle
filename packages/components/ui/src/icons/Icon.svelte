<script>
	export const defaultFill = 'none';
	export const defaultSize = 24;
	export const defaultStroke = 'currentColor';
	export const defaultStrokeWidth = 2;

	const defaultGlyph = null;
	const strokeLinecap = 'round';
	const strokeLinejoin = 'round';
	const svgXmlns = 'http://www.w3.org/2000/svg';

	export let fill = defaultFill;
	export let glyph = defaultGlyph;
	export let glyphSize = defaultSize;
	export let size = defaultSize;
	export let stroke = defaultStroke;
	export let strokeWidth = defaultStrokeWidth;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: fill = fill || defaultFill;
	$: glyph = glyph || defaultGlyph;
	$: size = size || defaultSize;
	$: stroke = stroke || defaultStroke;
	$: strokeWidth = strokeWidth || defaultStrokeWidth;
	$: viewBox = `0 0 ${glyphSize} ${glyphSize}`;
</script>

<div>
	<svg
		{fill}
		{stroke}
		{svgXmlns}
		{viewBox}
		height={size}
		stroke-linecap={strokeLinecap}
		stroke-linejoin={strokeLinejoin}
		stroke-width={strokeWidth}
		width={size}
	>
		<svelte:component this={glyph} />
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
