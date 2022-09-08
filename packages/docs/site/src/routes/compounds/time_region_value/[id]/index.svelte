<script context='module'>
	import {parseCSV}
		from '@svizzle/time_region_value/src/lib/utils/domain.js';

	import {lookup} from '../_data/stores.js';

	export function preload ({params: {id}}) {
		return this.fetch(lookup[id].url)
		.then(r => r.text())
		.then(parseCSV(id))
		.then(data => ({data, id}))
	}
</script>

<script>
	import {default as types}
		from '@svizzle/time_region_value/src/lib/data/types.js';
	import IdIndex from '@svizzle/time_region_value/src/routes/[id]/index.svelte';

	export let data;
	export let id;
</script>

<IdIndex
	{data}
	{id}
	{types}
/>
