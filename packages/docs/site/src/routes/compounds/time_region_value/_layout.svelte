<script>
	import Layout from '@svizzle/time_region_value/src/routes/_layout.svelte';

	import {goto as goTo} from '@sapper/app';

	import {groupsStore} from './_data/stores';
	import {hrefBase} from './_navigation';

	export let segment;
</script>

<section>
	<nav>
		<a
			class='undecor'
			href='/svizzle/compounds/time_region_value'
		>
			<span><code>time_region_value</code></span>
		</a>
	</nav>
	<main>
		<Layout
			{goTo}
			{groupsStore}
			{segment}
			{hrefBase}
		>
			<slot></slot>
		</Layout>
	</main>
</section>

<style>
	section {
		--header_height: 50px;
		display: grid;
		grid-template-areas: 'header' 'content';
		grid-template-columns: 100%;
		grid-template-rows: var(--header_height) calc(100% - var(--header_height));
		height: 100%;
		width: 100%;
	}

	nav {
		border-bottom: 1px solid var(--color-main);
		grid-area: header;
		height: 100%;
		padding: var(--dim-padding);
		width: 100%;
	}

	main {
		grid-area: content;
		height: 100%;
		width: 100%;
	}
</style>
