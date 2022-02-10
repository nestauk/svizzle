<script>
	import {makeWebStreamsFetcher} from '@svizzle/request'

	import {createFetchManagerStores} from './utils'

	let _asapKeys,
		_nextKeys,
		_outData,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap;

	// input props
	export let asapKeys
	export let nextKeys
	export let shouldPrefetch
	export let transformer
	export let uriMap

	// output props (for binding)
	export let outData = $_outData
	export let outLoadingKeys = $_outLoadingKeys

	const reset = dfn => {
		({
			_asapKeys,
			_nextKeys,
			_outData,
			_outLoadingKeys,
			_shouldPrefetch,
			_uriMap
		} = createFetchManagerStores(dfn));
		$_asapKeys = asapKeys;
		$_nextKeys = nextKeys;
		$_shouldPrefetch = shouldPrefetch;
		$_uriMap = uriMap;
	}
	// eslint-disable-next-line no-undef
	$: downloadFn = makeWebStreamsFetcher(globalThis.fetch, transformer);
	$: reset(downloadFn)

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
