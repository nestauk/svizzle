<script context="module">
	export function preload() {
		return this.fetch('components/groups.json')
			.then(r => r.json())
			.then(groups => ({ groups }));
	}
</script>

<script>
	export let groups;
	export let segment; // 'BarchartV-defaultColor'
</script>

<div>
	<nav>
		{#each groups as {key, value}}
		<h2>{key}</h2>
		{#each value as {slug, title}}
		<a href="components/{slug}">
			<p class:selected='{slug === segment}'>
				{title}
			</p>
		</a>
		{/each}
		{/each}
	</nav>
	<main>
		<slot></slot>
	</main>
</div>

<style>
	div {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: 15% 85%;
		grid-template-rows: 100%;
	}

	nav {
		height: 100%;
		width: 100%;
		padding: var(--dim-padding);
		border-right: 1px solid var(--color-main-lighter);
		overflow-y: auto;
	}

	nav a {
		text-decoration: none;
	}

	nav p {
		line-height: 1.75rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
	}

	nav p.selected {
		background-color: var(--color-main-lighter) !important;
	}

	nav p:hover {
		cursor: pointer;
		background-color: var(--color-grey-lighter);
	}

	main {
		height: 100%;
		width: 100%;
		padding: var(--dim-padding);
	}
</style>
