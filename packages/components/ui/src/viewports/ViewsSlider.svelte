<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {setContext} from 'svelte';
	import {writable} from 'svelte/store';

	export let viewId;

	let viewsCount = 0;
	let indexByIdsMap = {}

	const _viewId = writable();

	const registerView = id => {
		indexByIdsMap = {...indexByIdsMap, [id]: viewsCount++};
	}

	setContext('viewport', {
		_viewId,
		registerView
	});

	$: $_viewId = viewId;
	$: currentViewIndex = indexByIdsMap[$_viewId] ?? 1;
	$: style = makeStyleVars({currentViewIndex, viewsCount})
</script>

<div class='ViewsSlider'>
	<div
		{style}
		class='views'
	>
		<slot />
	</div>
</div>

<style>
	.ViewsSlider {
		height: 100%;
		width: 100%;
	}

	.views {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: repeat(var(--viewsCount), calc( 100% / var(--viewsCount) ));
		height: 100%;
		overflow-y: hidden;
		transform: translateX(calc( var(--currentViewIndex) * -100% / var(--viewsCount)));
		transition: transform 0.25s ease;
		width: calc(100% * var(--viewsCount) );
	}
</style>
