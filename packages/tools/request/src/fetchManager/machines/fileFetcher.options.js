import {assign, send, sendParent} from 'xstate';

/* utils */

const mergeUint8Arrays = arrays => {
	const totalLength = arrays.reduce(
		(acc, array) => acc + array.length,
		0
	);
	const mergedArray = new Uint8Array(totalLength);

	let start = 0;
	arrays.forEach(array => {
		mergedArray.set(array, start);
		start += array.length;
	});

	return mergedArray;
}

/* services */
const getFetchReader = async (URI, myFetch) => {
	const response = await myFetch(URI);
	const stream = await response.body;
	const reader = stream.getReader();
	return reader;
}

const readChunk = ({fetchReader}) => fetchReader.read()

/* actions */

const storeFetchReader = (ctx, {data}) => ({fetchReader: data})

const storeChunk = ({chunks}, {data: {done, value}}) => {
	if (!done) {
		chunks.push(value);
	}
	return {done, chunks};
}

/* Success */

const sendParentFileCompleted = sendParent(({URI, chunks}) => ({
	bytes: mergeUint8Arrays(chunks),
	type: 'FILE_COMPLETED',
	URI
}));

/* Cancelling */

const cancelFileFetching = async ({readerCell}, {reason}) => {
	const [reader] = readerCell;
	await reader.cancel(reason);
}

const sendParentFileCancelled = sendParent(({URI}) => ({
	type: 'FILE_CANCELLED',
	URI
}));

/* Error */

const sendParentFileErrored = sendParent(({URI}) => ({
	type: 'FILE_ERRORED',
	URI
}));

/* options */

export const fileFetcherOptions = {
	actions: {
		cancelFileFetching,
		sendParentFileCancelled,
		sendParentFileCompleted,
		sendParentFileErrored,
		storeChunk: assign(storeChunk),
		storeFetchReader: assign(storeFetchReader)
	},
	guards: {
		isDone: ({done}) => done
	},
	services: {
		getFetchReader: ({URI, myFetch}) => getFetchReader(URI, myFetch),
		readChunk
	}
};
