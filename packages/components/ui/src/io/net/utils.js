import {makeFetchManager} from '@svizzle/request/src/fetchManager';
import {get, readable, writable} from 'svelte/store';

const rxToReadable = observable => readable(
	observable.getValue?.(),
	set => {
		const subscription = observable.subscribe(value => set(value));

		return () => subscription.unsubscribe();
	}
);

export const rxToWritable = observable => {
	const store = writable(
		observable.getValue?.(),
		set => {
			const subscription = observable.subscribe(
				value => value !== get(store) && set(value)
			);

			return () => subscription.unsubscribe();
		}
	);
	store.subscribe(value => observable.next(value));

	return store;
}

export const makeWrappedFetchManager = downloadFn => {
	const {
		_asapKeys,
		_nextKeys,
		_outData,
		_outEvents,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap,
	} = makeFetchManager(downloadFn);

	return {
		_asapKeys: rxToWritable(_asapKeys),
		_nextKeys: rxToWritable(_nextKeys),
		_outData: rxToReadable(_outData),
		_outEvents: rxToReadable(_outEvents),
		_outLoadingKeys: rxToReadable(_outLoadingKeys),
		_shouldPrefetch: rxToWritable(_shouldPrefetch),
		_uriMap: rxToWritable(_uriMap),
	}
}
