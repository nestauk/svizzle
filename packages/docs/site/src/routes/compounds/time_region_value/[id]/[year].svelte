<script context='module'>
	import {IdYear, parseCSV, types} from '@svizzle/time_region_value';

	import {lookup} from '../_data/stores.js';

	export function preload ({params: {id, year}}) {
		return this.fetch(lookup[id].url)
		.then(r => r.text())
		.then(parseCSV(id))
		.then(data => ({data, id, year}))
	}
</script>

<script>
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
