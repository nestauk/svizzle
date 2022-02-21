export const fileFetcherConfig = {
	id: 'FileFetcher',
	initial: 'Pending',
	states: {
		Pending: {
			entry: 'startFileFetching',
			on: {
				CANCEL: {
					target: '#FileFetcher.Cancelling'
				},
				SUCCESS: {
					target: '#FileFetcher.Succesful'
				},
				ERRORED: {
					target: '#FileFetcher.Erroring'
				},
				CHUNK: {
					actions: 'storeChunk'
				}
			}
		},
		Cancelling: {
			type: 'final',
			entry: [
				'cancelFileFetching',
				'sendParentCancelled'
			]
		},
		Succesful: {
			entry: 'sendParentFileCompleted'
		},
		Erroring: {
			entry: 'sendParentFileErrored'
		}
	}
};
