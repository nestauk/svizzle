<script>
	export let innerHeight = null;
	export let innerWidth = null;
	export let onResize;
</script>

<svelte:window
	bind:innerWidth={innerWidth}
	bind:innerHeight={innerHeight}
	on:resize={onResize}
/>
