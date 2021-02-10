<script>
	import Index from '@svizzle/time_region_value/src/routes/index.svelte';

	import {goto as goTo} from '@sapper/app';

	import {groupsStore, yearRangeStore} from './_data/stores';
	import {hrefBase} from './_navigation';
</script>

<Index
	{goTo}
	{groupsStore}
	{yearRangeStore}
	{hrefBase}
/>
