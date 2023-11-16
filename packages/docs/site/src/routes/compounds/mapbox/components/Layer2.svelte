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
	$: cx = x + width / 2
	$: cy = y + height / 2
</script>

<circle
	{cx}
	{cy}
	r={abs(xp2-xp1) / 2}
	stroke='red'
	fill='#00F4'
/>

<text
	x={cx}
	y={cy}
	text-anchor='middle'
	dominant-baseline='middle'
>
	Layer 2
</text>
