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

<section>
	<nav>
		{#each groups as {key, value}}
		<div class="distancer">
			<h2>{key}</h2>
			{#each value as {slug, title}}
			<a href="components/{slug}">
				<p class:selected='{slug === segment}'>
					{title}
				</p>
			</a>
			{/each}
		</div>
		{/each}
	</nav>
	<main>
		<slot></slot>
	</main>
</section>

<style>
	section {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: var(--dim-sidebar-width) calc(100% - var(--dim-sidebar-width));
		grid-template-rows: 100%;
	}

	nav {
		height: 100%;
		width: 100%;
		padding: var(--dim-padding);
		border-right: 1px solid var(--color-main);
		overflow-y: auto;

		background-color: var(--color-sidebar-bkg);
		color: var(--color-main);
	}

	nav h2 {
		font-family: Open Sans Regular;
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
		font-family: Open Sans SemiBold;
	}

	nav p:hover {
		cursor: pointer;
		background-color: var(--color-main);
		color: var(--color-font-light);
	}

	main {
		height: 100%;
		width: 100%;
		padding: var(--dim-padding);
	}
</style>
