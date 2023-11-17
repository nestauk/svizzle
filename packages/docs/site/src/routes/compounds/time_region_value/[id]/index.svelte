<script context='module'>
	import {IdIndex, parseCSV, types} from '@svizzle/time_region_value';

	import {lookup} from '../_data/stores.js';

	export function preload ({params: {id}}) {
		return this.fetch(lookup[id].url)
		.then(r => r.text())
		.then(parseCSV(id))
		.then(data => ({data, id}))
	}
</script>

<script>
	export let data;
	export let id;
</script>

<IdIndex
	{data}
	{id}
	{types}
/>
