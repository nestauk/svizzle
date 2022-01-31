<script>
	import {makeWrappedFetchManager} from './utils'

	const {
		_asapKeys,
		_nextKeys,
		_outData,
		_outLoadingKeys,
		_shouldPrefetch,
		_transformer,
		_uriMap
	} = makeWrappedFetchManager()

	// input props
	export let asapKeys = $_asapKeys
	export let nextKeys = $_nextKeys
	export let shouldPrefetch = $_shouldPrefetch
	export let transformer = $_transformer
	export let uriMap = $_uriMap

	// output props (for binding)
	export let outData = $_outData
	export let outLoadingKeys = $_outLoadingKeys

	$: $_asapKeys = asapKeys
	$: $_transformer = transformer
	$: $_nextKeys = nextKeys
	$: $_shouldPrefetch = shouldPrefetch
	$: $_uriMap = uriMap

	$: outData = $_outData
	$: outLoadingKeys = $_outLoadingKeys
</script>
