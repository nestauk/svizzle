<script>
	import Index from '@svizzle/time_region_value/src/routes/index.svelte';

	import {_groups, _yearRange} from './_data/stores';
	import {hrefBase} from './_navigation';
</script>

<Index
	{_groups}
	{_yearRange}
	{hrefBase}
/>
