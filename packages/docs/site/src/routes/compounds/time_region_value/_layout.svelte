<script>
	import Layout from '@svizzle/time_region_value/src/routes/_layout.svelte';
	import Link from '@svizzle/ui/src/Link.svelte';

	import {_groups} from './_data/stores';
	import {flags, hrefBase, regionSettings} from './_config';

	export let segment;
</script>

<svelte:head>
	<title>@svizzle/time_region_value</title>
</svelte:head>

<section>
	<nav>
		<Link
			href='/svizzle/compounds/time_region_value'
			rel='prefetch'
		>
			<span>@svizzle/time_region_value</span>
		</Link>
	</nav>
	<main>
		<Layout
			{_groups}
			{flags}
			{hrefBase}
			{regionSettings}
			{segment}
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
