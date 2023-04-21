<script>
	import {Layout} from '@svizzle/time_region_value';

	import {flags, hrefBase, regionSettings} from './_config.js';
	import {_groups} from './_data/stores.js';

	const shouldPrefetch = true; // TODO should take it from a banner

	export let segment;
</script>

<svelte:head>
	<title>@svizzle/time_region_value</title>
</svelte:head>

<Layout
	{_groups}
	{flags}
	{hrefBase}
	{regionSettings}
	{segment}
	{shouldPrefetch}
>
	<slot></slot>
</Layout>
