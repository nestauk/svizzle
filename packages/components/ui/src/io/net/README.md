# FetchDriver Component

The `FetchDriver` component can be used to prefetch and cache multiple resources
so as to improve perceived UX performance when they are eventually needed.

## Usage 

Props:
- `data`: output property for binding that receives the file contents: `{[key]: transformedFileContents}`
- `defaultTransformer`: function that transforms a byte array with file contents into something else.
- `loadingKeys`: output property for binding with array of keys that are currently being loaded.
- `prefetch`: boolean, if true downloads all resources specified in `sources`, otherwise only those requested in `priorities.asap`.
- `priorities`: specifies the order that files in `sources` should be loaded. `{asap:[...], next:[...]}`
- `sources`: names and describes resources to be loaded. `{[key]: {url: string, transformer?: () => {}}}` 

In the current version, changing `sources` clears all cached files, aborts all
running downloads and fetches all resources specified, even if they were
previously downloaded.

Changing `priorities` before all downloads complete will keep any running
downloads that are specified in `priorities.asap` and abort the rest. Any
previously completed downloads will be maintained.

Setting `prefetch` to false, if previously false, will abort any running
downloads except those specified in `priorities.asap`.

Changing `defaultTransformer` while downloads are running will affect the output
of those resources that are not completed or started and don't have a custom
transformer declared in its `sources` entry.

```html
<script>
	import FetchDriver from '@svizzle/ui/src/io/net/FetchDriver.svelte'

	const decoder = new TextDecoder()
	const jsonParser = bytes => JSON.parse(decoder.decode(bytes))

	let sources = {
		'NUTS-2013-0-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_0.json'
		},
		'NUTS-2013-1-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_1.json'
		},
		'NUTS-2013-2-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_2.json'
		}
	}
	let priorities = { 
		asap: [
			'NUTS-2013-0-10',
		],
		next: [
			'NUTS-2013-1-10',
		]
	}
	let prefetch = true

	let data // data store: {[key]: contents}
	let loadingKeys // array of strings
</script>

<FetchDriver
	bind:data
	bind:loadingKeys
	defaultTransformer={jsonParser}
	{prefetch}
	{priorities}
	{sources}
/>
```
