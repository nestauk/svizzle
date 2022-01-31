import {get, readable, writable} from 'svelte/store'
import {makeFetchManager} from '@svizzle/request/src/fetchManager'

// Placed these functions in `@svizzle/ui` since it already has
// `svelte` installed. If these were to go in `@svizzle/request`
// we would have to add the dependency there.

const rxToReadable = observable => readable(
	observable.getValue?.(),
	set => {
		const subscription = observable.subscribe(value => set(value))
		return () => subscription.unsubscribe()
	}
)

export const rxToWritable = observable => {
	const store = writable(
		observable.getValue?.(),
		set => {
			const subscription = observable.subscribe(value =>
				value !== get(store) && set(value)
			)
			return () => subscription.unsubscribe()
		}
	)
	store.subscribe(value => observable.next(value))
	return store
}

export const makeWrappedFetchManager = downloadFn => {
	const fetchManager = makeFetchManager(downloadFn)
	return {
		_asapKeys: rxToWritable(fetchManager._asapKeys),
		_nextKeys: rxToWritable(fetchManager._nextKeys),
		_shouldPrefetch: rxToWritable(fetchManager._shouldPrefetch),
		_uriMap: rxToWritable(fetchManager._uriMap),
		_outData: rxToReadable(fetchManager._outData),
		_outLoadingKeys: rxToReadable(fetchManager._outLoadingKeys)
	}
}
