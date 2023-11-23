<script>
	import {setupResizeObserver} from '@svizzle/ui';
	import {getKey, getValue} from '@svizzle/utils';
	import {hierarchy, stratify, treemap} from 'd3-hierarchy';
	import * as _ from 'lamb';
	import {createEventDispatcher} from 'svelte';

	export let geometry;
	export let items;
	export let keyAccessor = getKey;
	export let keyToColorFn;
	export let keyToColorLabelFn;
	export let valueAccessor = getValue;

	let treemapHeight;
	let treemapWidth;

	const defaultGeometry = {
		lineHeight: 20,
		paddingInner: 5,
		paddingOuter: 2,
		textPadding: 8
	};

	const dispatch = createEventDispatcher();
	const {
		_writable: _size,
		resizeObserver: sizeObserver
	} = setupResizeObserver();
	const stratifyData = stratify().path(_.identity);

	$: ({inlineSize: treemapWidth, blockSize: treemapHeight} = $_size);
	$: geometry = geometry ? {...defaultGeometry, ...geometry} : defaultGeometry;
	$: getHierarchy = stratified =>
		hierarchy(stratified)
		.sum(x => x.data ? valueAccessor(x.data) : 0); // root.data = null
	$: getTreeRoot = _.pipe([stratifyData, getHierarchy]);
	$: getTreemap =
		treemap()
		.size([treemapWidth, treemapHeight])
		.paddingOuter(geometry.paddingOuter)
		.paddingInner(geometry.paddingInner);
	$: treeRoot = getTreeRoot(items);
	$: treemapLeaves = getTreemap(treeRoot).leaves();

	let textGroups;
	$: if (textGroups && treemapLeaves.length > textGroups.length) {
		textGroups = [
			...textGroups,
			...new Array(treemapLeaves.length - textGroups.length)
		]
	} else if (!textGroups) {
		textGroups = new Array(treemapLeaves.length)
	}

	$: textBboxes = _.map(textGroups, gNode => gNode?.getBBox());
	$: leavesChecks = _.map(
		_.zip(textBboxes, treemapLeaves),
		([textBbox, {x0, x1, y0, y1}]) => {
			const totalPadding = geometry.textPadding * 2;
			const availableWidth = x1 - x0 - totalPadding;
			const availableHeight = y1 - y0 - totalPadding;

			return textBbox
				? [
					textBbox.width < availableWidth && textBbox.height < availableHeight,
					textBbox.width < availableHeight && textBbox.height < availableWidth
				]
				: [false, false]
		}
	);
</script>

<div
	class='Treemap'
	use:sizeObserver
>
	<svg
		height={treemapHeight}
		width={treemapWidth}
	>
		{#each treemapLeaves
			as {x0, x1, y0, y1, data: {data}}, i
		}
			{@const rectHeight = Math.max(y1 - y0, 0)}
			{@const rectWidth = Math.max(x1 - x0, 0)}

			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<g
				role='none'
				on:mousemove={({x, y}) => dispatch('leafHovered', {data, x, y})}
				on:mouseout={({x, y}) => dispatch('leafExited', {data, x, y})}
				on:touchend={() => dispatch('leafTouchEnded', {data})}
				on:touchstart|preventDefault={({targetTouches: [touch]}) => {
					const {clientX: x, clientY: y} = touch;
					dispatch('leafTouchStarted', {data, x, y})
				}}
				transform='translate({x0 || 0},{y0 || 0})'
			>
				<rect
					fill={keyToColorFn(keyAccessor(data))}
					height={rectHeight}
					stroke-width={0.5}
					stroke='var(--colorBorderAux)'
					width={rectWidth}
				/>
				<g
					bind:this={textGroups[i]}
					transform={!leavesChecks[i][0] && leavesChecks[i][1]
						? `translate(0,${rectHeight}) rotate(-90)`
						: ''
					}
					class:tooLarge={!leavesChecks[i][0] && !leavesChecks[i][1]}
				>
					<text
						dx={geometry.textPadding}
						dy={geometry.textPadding}
						fill={keyToColorLabelFn(keyAccessor(data))}
						maxHeight={rectHeight}
						maxWidth={rectWidth}
					>{keyAccessor(data)}</text>
					<text
						dx={geometry.textPadding}
						dy={geometry.textPadding + geometry.lineHeight}
						fill={keyToColorLabelFn(keyAccessor(data))}
					>{valueAccessor(data)}</text>
				</g>
			</g>
		{/each}
	</svg>
</div>

<style>
	.Treemap {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	svg {
		display: block;
	}

	text {
		dominant-baseline: hanging;
		stroke: none;
	}

	g.tooLarge {
		visibility: hidden;
	}
</style>
