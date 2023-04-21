<script>
	import {Link} from '@svizzle/ui';

	export let segment; // 'BarchartV-defaultColor'

	const examples = ['empty', 'layers', 'custom_controls', 'all']
</script>

<section>
	<nav>
		{#each examples as example}
			<Link
				href='compounds/mapbox/{example}'
				rel='prefetch'
			>
				<p class:selected='{example === segment}'>
					{example}
				</p>
			</Link>
		{/each}
	</nav>
	<main>
		<slot/>
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

	nav p {
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
	}

	nav p.selected {
		background-color: var(--color-selected);
		color: var(--color-selected-text);
		font-weight: bold;
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
