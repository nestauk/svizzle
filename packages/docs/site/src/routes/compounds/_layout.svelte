<script>
	import {Link} from '@svizzle/ui';
</script>

<svelte:head>
	<title>@svizzle compounds</title>
</svelte:head>

<section>
	<nav>
		<Link
			href='/svizzle/compounds/mapbox/empty'
			rel='prefetch'
		>
			<span>@svizzle/mapbox</span>
		</Link>
		<Link
			href='/svizzle/compounds/time_region_value'
			rel='prefetch'
		>
			<span>@svizzle/time_region_value</span>
		</Link>
		<Link
			href='/svizzle/compounds/viewports/ViewsSlider'
			rel='prefetch'
		>
			<span>@svizzle/ui: viewports</span>
		</Link>
	</nav>
	<main>
		<slot />
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
