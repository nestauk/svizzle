<script>
	import {makeWebStreamsFetcher} from '@svizzle/request';
	import * as _ from 'lamb';

	import {createFetchManagerStores} from './utils.js';

	let _asapKeys;
	let _nextKeys;
	let _outData;
	let _outLoadingKeys;
	let _shouldPrefetch;
	let _uriMap;

	// input props

	export let asapKeys = [];
	export let nextKeys = [];
	export let shouldPrefetch = false;
	export let transformer = _.identity;
	export let uriMap = {};

	// output props (for binding)

	export let outData = $_outData;
	export let outLoadingKeys = $_outLoadingKeys;

	const reset = downloadFunc => {
		({
			_asapKeys,
			_nextKeys,
			_outData,
			_outLoadingKeys,
			_shouldPrefetch,
			_uriMap
		} = createFetchManagerStores(downloadFunc));
		$_asapKeys = asapKeys;
		$_nextKeys = nextKeys;
		$_shouldPrefetch = shouldPrefetch;
		$_uriMap = uriMap;
	}
	// eslint-disable-next-line no-undef
	$: downloadFn = makeWebStreamsFetcher(globalThis.fetch, transformer);
	$: reset(downloadFn);

	// eslint-disable-next-line no-unused-vars
	$: _asapKeys && ($_asapKeys = asapKeys);
	// eslint-disable-next-line no-unused-vars
	$: _nextKeys && ($_nextKeys = nextKeys);
	// eslint-disable-next-line no-unused-vars
	$: _shouldPrefetch && ($_shouldPrefetch = shouldPrefetch);
	// eslint-disable-next-line no-unused-vars
	$: _uriMap && ($_uriMap = uriMap);

	$: _outData && (outData = $_outData);
	$: _outLoadingKeys && (outLoadingKeys = $_outLoadingKeys);
</script>
