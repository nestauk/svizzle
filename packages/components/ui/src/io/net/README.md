# FetchDriver Component

The FetchDriver component can prefetch and cache multiple resources in the
background, improving the download UX.

The component wraps the functionality of `@svizzle/request/src/fetchManager/fetchManager.js`
so that it can be used in a declarative 'svelty' style. Please refer to 
[this README](https://github.com/nestauk/svizzle/blob/dev/packages/tools/request/src/fetchManager/README.md)
for full documentation.

## Input props 

- `asapKeys`: array of key names referring to those files that should be downloaded immediately.
- `nextKeys`: array of key names referring to those files that should be downloaded only after all files in `asapKeys` are completed, and only if `shouldPrefetch` is `true`.
- `shouldPrefetch`: boolean, if `false` it only downloads resources specified in `asapKeys`,  otherwise it downloads resources specified in `asapKeys`, then those specified in `nextKeys`, then the rest.
- `transformer`: function that transforms the `uint8` buffer when a download completes. The default function interprets file contents as JSON and returns an object.
- `uriMap`: map of names to resources. Besides the required URI, each resource may specify a custom transformation function. `{[key]: {url: string, transformer?: () => {}}}` 

## Output props

These properties are meant as read-only and should not be modified by users.

They get updated as the fetching progresses so the way to use them is to bind to
them to react to their changes.

- `outData`: object `{[key]: fileContents}`, with keys correspondent to the keys provided in uriMap.
- `outLoadingKeys`: array of the keys of the resources that are currently being fetched.

## Effect of changing props during execution

Changing `uriMap` clears all cached files, cancels all running downloads and
fetches all resources specified, even if they were previously downloaded.

Changing `asapKeys` or `nextKeys` before all downloads complete will keep any
running downloads that are still requested according to their priority and cancel
the rest. Any previously completed downloads will be maintained.

Setting `shouldPrefetch` from `true` to `false` will cancel any running
downloads except those specified in `asapKeys`. Changing it from `false` to
`true` will mark resources not in `asapKeys` for fetching, meaning:

- if “asap” resources are downloading, “next” resources will be fetched next
- if “asap” resources are done downloading, “next” resources start downloading

Changing `transformer` while downloads are running will clear the cache and 
restart all downloads.

## Usage 

This component is for client-side consumption only as it depends on the `fetch`
function and the Web Streams API provided by browsers. To use the features in
the server one may use `fetchManager` directly in conjunction with the `undici`
NPM module, which provides equivalent support for Node.JS.

```html
<script>
	import FetchDriver from '@svizzle/ui/src/io/net/FetchDriver.svelte';
	import {isClientSide} from '@svizzle/ui/src/utils/env';

	const decoder = new TextDecoder();
	const jsonParser = bytes => JSON.parse(decoder.decode(bytes));

	let uriMap = {
		'NUTS-2013-0-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_0.json'
		},
		'NUTS-2013-1-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_1.json'
		},
		'NUTS-2013-2-10':{
			url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_2.json'
		}
	};
	let asapKeys = ['NUTS-2013-0-10'];
	let nextKeys = ['NUTS-2013-1-10'];
	let shouldPrefetch = true;

	let outData; // data store: {[key]: contents}
	let outLoadingKeys; // array of strings (keys of currently loading resources)
</script>

{#if isClientSide}
	<FetchDriver
		bind:outData
		bind:outLoadingKeys
		{asapKeys}
		{nextKeys}
		{shouldPrefetch}
		{uriMap}
		transformer={jsonParser}
	/>
{/if}
```
