import { assign } from 'core-js/core/object';
import {send, sendParent} from 'xstate';

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

/* actions */

const startFileFetching = async ({URI, myFetch, readerCell, chunks}) => {
	const response = await myFetch(URI);
	const stream = await response.body;
	const reader = stream.getReader();
	readerCell[0] = reader;

	const processChunk = ({done, value}) => {
		try {
			if (!done) {
				send({
					type: 'CHUNK',
					chunk: value
				})
				reader.read().then(processChunk);
			} else {
				send('SUCCESS');
			}
		} catch (error) {
			send({
				type: 'ERROR',
				error
			});
		}
	};

	// start reading
	reader.read().then(processChunk);
}

const storeChunk = ({chunks}, {chunk}) => {
	chunks.push(chunk);
	return {chunks};
}

/* Success */

const sendParentFileCompleted = ({URI, chunks}) => {
	sendParent({
		bytes: mergeUint8Arrays(chunks),
		type: 'FILE_COMPLETED',
		URI
	})
}

/* Cancelling */

const cancelFileFetching = async ({readerCell}, {reason}) => {
	const [reader] = readerCell;
	await reader.cancel(reason);
}

const sendParentFileCancelled = ({URI}) => {
	sendParent({
		type: 'FILE_CANCELLED',
		URI
	});
}

/* Error */

const sendParentFileErrored = ({URI}) => {
	sendParent({
		type: 'FILE_ERRORED',
		URI
	});
}

/* options */

export const fileFetcherOptions = {
	actions: {
		cancelFileFetching,
		sendParentFileCancelled,
		sendParentFileCompleted,
		sendParentFileErrored,
		startFileFetching,
		storeChunk: assign(storeChunk)
	},
	guards: {
	}
};
