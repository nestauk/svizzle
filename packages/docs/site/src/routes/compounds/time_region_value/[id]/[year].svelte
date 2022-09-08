<script context='module'>
	import {parseCSV}
		from '@svizzle/time_region_value/src/lib/utils/domain.js';

	import {lookup} from '../_data/stores.js';

	export function preload ({params: {id, year}}) {
		return this.fetch(lookup[id].url)
		.then(r => r.text())
		.then(parseCSV(id))
		.then(data => ({data, id, year}))
	}
</script>

<script>
	import {default as types}
		from '@svizzle/time_region_value/src/lib/data/types.js';
	import IdYear from '@svizzle/time_region_value/src/routes/[id]/[year].svelte';

	export let data;
	export let id;
	export let year;
</script>

<IdYear
	{data}
	{id}
	{types}
	{year}
/>
