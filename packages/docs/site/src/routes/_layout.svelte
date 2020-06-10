<script>
	import Nav from 'app/components/Nav.svelte';

	export let segment;
</script>

<header>
	<Nav {segment}/>
</header>

<main>
	<slot></slot>
</main>

<style>
	header {
		height: var(--dim-header-height);
		width: 100%;
		padding: 0 var(--dim-padding);

		background-color: var(--color-main);
		color: var(--color-font-light);
	}

	main {
		height: var(--dim-main-height);
		width: 100%;
	}
</style>
