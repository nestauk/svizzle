<script>
	export let innerHeight;
	export let innerWidth;
	export let onResize;
</script>

<svelte:window
	bind:innerWidth={innerWidth}
	bind:innerHeight={innerHeight}
	on:resize={onResize}
/>
