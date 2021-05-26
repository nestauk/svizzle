<script>
	import Index from '@svizzle/time_region_value/src/routes/index.svelte';

	import {goto as goTo} from '@sapper/app';

	import {_groups, _yearRange} from './_data/stores';
	import {hrefBase} from './_navigation';
</script>

<Index
	{_groups}
	{_yearRange}
	{goTo}
	{hrefBase}
/>
