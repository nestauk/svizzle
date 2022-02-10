<script>
	import * as _ from 'lamb';
	import FetchDriver from '@svizzle/ui/src/io/net/FetchDriver.svelte';

	const sources = {
		'NUTS-2013-0-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_0.json'
		},
		'NUTS-2013-1-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_1.json'
		},
		'NUTS-2013-2-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_2.json'
		},
		'NUTS-2013-3-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_3.json'
		},
		'NUTS-2013-0-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2013_4326_LEVL_0.json'
		},
		'NUTS-2013-1-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2013_4326_LEVL_1.json'
		},
		'NUTS-2013-2-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2013_4326_LEVL_2.json'
		},
		'NUTS-2016-0-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_0.json'
		},
		'NUTS-2016-1-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_1.json'
		},
		'NUTS-2016-2-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_2.json'
		},
		'NUTS-2016-3-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_3.json'
		},
		'NUTS-2016-0-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_0.json'
		},
		'NUTS-2016-1-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_1.json'
		},
		'NUTS-2016-2-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_2.json'
		},
		'NUTS-2016-3-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_3.json'
		},
		'NUTS-2021-0-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2021_4326_LEVL_0.json'
		},
		'NUTS-2021-1-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2021_4326_LEVL_1.json'
		},
		'NUTS-2021-2-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2021_4326_LEVL_2.json'
		},
		'NUTS-2021-3-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_3.json'
		},
		'NUTS-2021-0-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_0.json'
		},
		'NUTS-2021-1-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_1.json'
		},
		'NUTS-2021-2-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_2.json'
		},
		'NUTS-2021-3-03':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_3.json'
		}
	}

	const priorities = {
		asap: [
			'NUTS-2016-1-03',
		],
		next: [
			'NUTS-2021-0-10',
			'NUTS-2013-0-10',
			'NUTS-2016-0-10',
			'NUTS-2016-2-03',
		]
	}

	const decoder = new TextDecoder();
	const decode = bytes => decoder.decode(bytes);
	const jsonParser = _.pipe([
		decode,
		JSON.parse,
	]);
	let data = {};
	let loadingKeys = [];
	let notLoaded = [];
</script>

<FetchDriver
	bind:outData={data}
	bind:outLoadingKeys={loadingKeys}
	uriMap={sources}
	asapKeys={priorities.asap}
	nextKeys={priorities.next}
	transformer={jsonParser}
	shouldPrefetch
/>

<h4>Not loaded</h4>
{notLoaded.join(', ')}

<h4>Loading</h4>
{loadingKeys.join(', ')}

<h4>Loaded</h4>
<ul>
	{#each Object.entries(data) as i}
		<li>{i[0]}: {i[1].arcs.length} arcs</li>
	{/each}
</ul>
