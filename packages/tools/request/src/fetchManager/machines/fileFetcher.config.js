export const fileFetcherConfig = {
	id: 'fileFetcher',
	initial: 'pending',
	states: {
		pending: {
			on: {
				CANCEL: {
					target: 'cancelled',
				},
				ERROR: {
					target: 'errored',
				},
				SUCCESS: {
					target: 'successful',
				},
			},
		},
		cancelled: {
			type: 'final',
			entry: 'cancelFileFetching',
		},
		errored: {
			type: 'final',
			entry: 'sendFileErrored',
		},
		successful: {
			type: 'final',
			entry: 'sendFileCompleted',
		},
	}
};
