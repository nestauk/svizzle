import {makeFetchManager} from '@svizzle/request/src/fetchManager';

import {rxToReadable, rxToWritable} from '../../utils/rx';

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
