<script>
	import {getContext} from 'svelte';

	export let wsen;

	const {_bbox, _projectFn} = getContext('mapBox');
	const {abs, min} = Math

	let xp1, xp2, yp1, yp2;

	$: [[x1,y1], [x2,y2]] = wsen || [[-180, -90], [180, 90]];
	// eslint-disable-next-line no-unused-expressions, no-sequences
	$: $_bbox, {x: xp1, y: yp1} = $_projectFn?.([x1, y1]);
	// eslint-disable-next-line no-unused-expressions, no-sequences
	$: $_bbox, {x: xp2, y: yp2} = $_projectFn?.([x2, y2]);

	$: x = min(xp1, xp2)
	$: y = min(yp1, yp2)
	$: width = abs(xp2-xp1)
	$: height = abs(yp2-yp1)
</script>

<rect
	{x}
	{y}
	{width}
	{height}
	stroke='red'
	fill='#F008'
/>

<text
	x={x + width / 2}
	y={y + height / 2}
	text-anchor='middle'
	dominant-baseline="middle"
>
	Layer 1
</text>
