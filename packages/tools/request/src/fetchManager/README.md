# fetchManager

`fetchManager` can manage the download of multiple files using interruptible
Web Streams. The downloads can be prioritized in three stages:

- asap: resources to be fetched immediately
- next: any resources that should be fetched after "asap" resources have finished downloading.
- rest: low priority resources that may be downloaded on idle time.

Changing priorities during download will cancel those resources that are no 
longer prioritary and start downloading the highest priority files not already
cached.

Interaction with `fetchManager` takes place through RxJS streams.

## Input props 

- `_asapKeys`: Stream accepting array of key names referring to those files that should be downloaded immediately.
- `_nextKeys`: Stream accepting array of key names referring to those files that should be downloaded only after all files in `_asapKeys` are completed, and only if `_shouldPrefetch` is `true`.
- `_shouldPrefetch`: boolean, if true downloads all resources specified in `_uriMap`, otherwise only those requested in `_asapKeys`.
- `_uriMap`: Stream accepting a map of names to resources. Besides the required URI, each resource may specify a custom transformation function. `{[key]: {url: string, transformer?: () => {}}}` 

## Output props

- `_outData`: output stream for subscribing that receives the file contents: `{[key]: fileContents}`
- `_outEvents`: output stream useful for tracking the state of the download process.
- `_outLoadingKeys`: output stream with array of keys that are currently being loaded.

These streams are meant exclusively for subscribing to and should not be modified by users.

### Events sent by `_outEvents`

- `file:start`: Sent when a file starts downloading. Payload: `{key, type: 'file:start'}`
- `file:complete`: Sent when a file download is complete. Payload: `{data: result.contents, key, type: 'file:complete'}`
- `file:cancel`: Sent after a file is cancelled. Payload: `{key, reason, type: 'file:cancel'}`
- `file:error`: Sent if a file download fails. Payload: `{key, error, type: 'file:error'}`
- `group:start`: Sent when starting a priority stage ('asap', 'next' or 'rest'). Payload: `{groupId, keys, skipping: fetchingOrFetchedTargetKeys, type: 'group:start' }`
- `group:complete`: Sent when a priority stage is complete. Payload: `{keys, cancelledKeys, groupId, type: 'group:complete'}`
- `reset`: Sent when clearing the cache and restarting any downloads. Payload: `{type: 'reset'}`
- `done`: Sent when all downloads are complete. Payload: `{type: 'done'}`


## Effect of changing props during execution

Changing `_uriMap` clears all cached files, cancels all running downloads and
fetches all resources specified, even if they were previously downloaded.

Changing `_asapKeys` or `_nextKeys` before all downloads complete will keep any
running downloads that are still requested according to their priority and cancel
the rest. Any previously completed downloads will be maintained.

Setting `_shouldPrefetch` from `true` to `false` will cancel any running
downloads except those specified in `_asapKeys`. Changing it from `false` to
`true` will mark resources not in `_asapKeys` for fetching, meaning:

- if “asap” resources are downloading, “next” resources will be fetched next
- if “asap” resources are done downloading, “next” resources start downloading

 ## Usage

```javascript
import {createFetchManagerStreams}
	from '@svizzle/request/src/fetchManager/fetchManager';
import {makeWebStreamsFetcher} from '@svizzle/request/src/webstreams';

// Use browser supplied `fetch` function. An alternative `fetch` implementation
// for Node supporting Web Streams can be found in `undici` NPM package.
const webStreamsFetcher = makeWebStreamsFetcher(fetch);

const {
	_asapKeys,
	_nextKeys,
	_outData,
	_outEvents,
	_outLoadingKeys,
	_shouldPrefetch,
	_uriMap,
} = createFetchManagerStreams(webStreamsFetcher);

_shouldPrefetch.next(true);
_uriMap.next({
	'FILE1':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_0.json'
	},
	'FILE2':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_1.json'
	},
	'FILE3':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_2.json'
	}
});
_asapKeys.next(['FILE3']);
_nextKeys.next(['FILE2']);

_outData.subscribe(data => {
	if ('FILE1' in data) {
		// FILE1 contents are completly loaded and stored in a byte array
	}
})
```

You may also specify a transformation function to postprocess file contents when
a download completes.

```javascript
// ...
const decoder = new TextDecoder('utf-8');
const transformer = JSON.parse(decoder.decode(buffer));

const webStreamsFetcher = makeWebStreamsFetcher(fetch, transformer);
// ...
```

## Status

As a note for future developments, we agreed that this implementation is too
brittle and that we should use a state machine to manage the logic rather than
Rx streams.
asap: resources to be fetched immediately