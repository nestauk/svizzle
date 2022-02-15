import {createFetchManagerStreams}
	from '@svizzle/request/src/fetchManager/fetchManager';

import {rxStreamToSvReadable, rxStreamToSvWritable} from '../../utils/rx';

export const createFetchManagerStores = downloadFn => {
	const {
		_asapKeys,
		_nextKeys,
		_outData,
		_outEvents,
		_outLoadingKeys,
		_shouldPrefetch,
		_uriMap,
	} = createFetchManagerStreams(downloadFn);

	return {
		_asapKeys: rxStreamToSvWritable(_asapKeys),
		_nextKeys: rxStreamToSvWritable(_nextKeys),
		_outData: rxStreamToSvReadable(_outData),
		_outEvents: rxStreamToSvReadable(_outEvents),
		_outLoadingKeys: rxStreamToSvReadable(_outLoadingKeys),
		_shouldPrefetch: rxStreamToSvWritable(_shouldPrefetch),
		_uriMap: rxStreamToSvWritable(_uriMap),
	};
};
