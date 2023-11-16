<script>
	import {getContext} from 'svelte';

	const {
		_viewId,
		registerView,
		viewType
	} = getContext('viewport');

	export let id;

	$: doRender = viewType !== 'xor';

	registerView(id);
</script>

{#if doRender || id === $_viewId}
	<slot />
{/if}
