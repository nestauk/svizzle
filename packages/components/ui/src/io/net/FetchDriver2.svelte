<script>
	import {makeFetchDriver} from './fetchDriver'

	const {
		_asapKeys,
		_defaultTransformer,
		_nextKeys,
		_outData,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap
	} = makeFetchDriver()

	// input props
	export let defaultTransformer = $_defaultTransformer
	export let asapKeys = $_asapKeys
	export let nextKeys = $_nextKeys
	export let shouldPrefetch = $_shouldPrefetch
	export let uriMap = $_uriMap

	// output props (for binding)
	export let outData = $_outData
	export let outLoadingKeys = $_outLoadingKeys

	$: $_asapKeys = asapKeys
	$: $_defaultTransformer = defaultTransformer
	$: $_nextKeys = nextKeys
	$: $_shouldPrefetch = shouldPrefetch
	$: $_uriMap = uriMap

	$: outData = $_outData
	$: outLoadingKeys = $_outLoadingKeys
</script>
