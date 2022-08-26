<script context='module'>
	import {parseCSV}
		from '@svizzle/time_region_value/src/node_modules/utils/domain';

	import {lookup} from '../_data/stores';

	export function preload ({params: {id, year}}) {
		return this.fetch(lookup[id].url)
		.then(r => r.text())
		.then(parseCSV(id))
		.then(data => ({data, id, year}))
	}
</script>

<script>
	import IdYear from '@svizzle/time_region_value/src/routes/[id]/[year].svelte';
	import types from '@svizzle/time_region_value/src/node_modules/data/types.yaml'; // TODO use a json file

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
