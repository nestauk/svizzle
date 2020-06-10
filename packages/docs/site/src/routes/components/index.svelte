<svelte:head>
	<title>Svizzle Components</title>
</svelte:head>

<script context="module">
	export function preload({ params, query }) {
		return this.fetch('components.json')
			.then(r => r.json())
			.then(components => {
				return { components };
			});
	}
</script>

<script>
	export let components;
</script>

<h1>Components</h1>

<ul>
	{#each components as component}
		<li>
			<a rel='prefetch' href='components/{component.slug}'>
				{component.name}
			</a>
		</li>
	{/each}
</ul>


<style>
	ul {
		line-height: 1.5;
		list-style: none;
		margin: 0 0 1em 0;
	}
</style>
