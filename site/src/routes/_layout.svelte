<script>
	import Nav from '../components/Nav.svelte';

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
		border-bottom: 1px solid rgba(255,62,0,0.1);
	}

	main {
		position: relative;
		height: var(--dim-main-height);
		width: 100%;
		padding: var(--dim-padding);
	}
</style>
