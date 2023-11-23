<script>
	import {HyperLink} from '@svizzle/ui';

	export let segment; // 'ViewsXor-view1'

	const examples = ['ViewsSlider', 'ViewsXor'];
</script>

<section>
	<nav>
		{#each examples as example}
			<HyperLink
				href='compounds/viewports/{example}'
				rel='prefetch'
			>
				<p class:selected='{example === segment}'>
					{example}
				</p>
			</HyperLink>
		{/each}
	</nav>
	<main>
		<slot/>
	</main>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: var(--dim-sidebar-width) calc(100% - var(--dim-sidebar-width));
		grid-template-rows: 100%;
		height: 100%;
		width: 100%;
	}

	nav {
		background-color: var(--color-sidebar-bkg);
		border-right: 1px solid var(--color-main);
		color: var(--color-main);
		height: 100%;
		overflow-y: auto;
		padding: var(--dim-padding);
		width: 100%;
	}

	nav p {
		align-items: center;
		display: flex;
		padding-left: 0.5rem;
	}

	nav p.selected {
		background-color: var(--color-selected);
		color: var(--color-selected-text);
		font-weight: bold;
	}

	nav p:hover {
		background-color: var(--color-main);
		color: var(--color-font-light);
		cursor: pointer;
	}

	main {
		height: 100%;
		padding: var(--dim-padding);
		width: 100%;
	}
</style>
